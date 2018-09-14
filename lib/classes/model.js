const { ObjectId } = require('mongodb');
const { db }       = require('../db');
const DataLoader   = require('dataloader');

const BATCH_LOAD      = Symbol('BATCH_LOAD');
const SANITIZE_INPUT  = Symbol('SANITIZE_INPUT');
const SANITIZE_OUTPUT = Symbol('SANITIZE_OUTPUT');

module.exports = class Model {

  /**
   * Model constructor
   * @method constructor
   * @param  {Object}    [opts={}] – must include `name` of collection
   * @return {Model}
   */

  constructor( opts = {} ) {
    Object.assign( this, opts );

    this.loader = new DataLoader( keys => this[ BATCH_LOAD ]( keys ) );
  }

  /**
   * batch load callback for DataLoader
   *
   * Returns records in the same order as `_ids` with missing records
   * as `null`
   *
   * @method BATCH_LOAD
   * @param  {Array<ObjectId>} _ids – array of ObjectIds to load
   * @return {Array<Object>}        – array of records
   */

  async [ BATCH_LOAD ]( _ids ) {
    const database   = await db();
    const collection = database.collection( this.name );
    const cursor     = collection.find({ _id: { $in: _ids.map( ObjectId ) } });
    const results    = await cursor.toArray();
    const map        = new Map;

    // ensure data is loaded in the given order, and sanitize output
    results.forEach( record => map.set( String( record._id ), record ) );

    return _ids.map( _id => {
      const key = String( _id );
      return map.has( key ) ? this[ SANITIZE_OUTPUT ]( map.get( key ) ) : null;
    });
  }

  /**
   * sanitize input data
   * @method
   * @param  {Object} data - input data
   * @return {Object}        output data
   */

  [ SANITIZE_INPUT ]( data ) {
    const out = { ...data };

    if ( this.objectIDs ) {
      for ( let prop of this.objectIDs ) {
        if ( out.hasOwnProperty( prop ) ) {
          out[ prop ] = ObjectId( out[ prop ] );
        }
      }
    }

    return out;
  }

  /**
   * sanitize output data
   * @method
   * @param  {Object} data - input data
   * @return {Object}        output data
   */

  [ SANITIZE_OUTPUT ]( data ) {
    const out = { ...data };

    if ( out._id ) {
      out._id = String( out._id );
    }

    if ( this.objectIDs ) {
      for ( let prop of this.objectIDs ) {
        if ( out.hasOwnProperty( prop ) ) {
          out[ prop ] = String( out[ prop ] );
        }
      }
    }

    return out;
  }

  /**
   * load a single record by _ids
   * @method load
   * @param  {ObjectId} _id – ObjectId of object to load
   * @return {Object}
   */

  async load( _id ) {
    const result = await this.loader.load( _id );
    return this[ SANITIZE_OUTPUT ]( result );
  }

  /**
   * find multiple records
   * @method find
   * @param  {Object} filter – mongo filter
   * @return {Array<Object>}   records
   */

  async find( filter, opts = {} ) {
    const database   = await db();
    const collection = database.collection( this.name );

    let cursor = collection.find( filter );

    if ( opts.skip ) {
      cursor = cursor.skip( opts.skip );
    }

    if ( opts.limit ) {
      cursor = cursor.limit( opts.limit );
    }

    const results = await cursor.toArray();

    return results.map( d => this[ SANITIZE_OUTPUT ]( d ) );
  }

  /**
   * insert a new records
   * @method insert
   * @param  {Object} data – data to insert
   * @return {Object}
   */

  async insert( data ) {
    const database   = await db();
    const collection = database.collection( this.name );

    return collection.insertOne( this[ SANITIZE_OUTPUT ]( data ) );
  }

  /**
   * insert multiple records
   * @method insertMany
   * @param  {Array<Object>}   data - data to insert
   * @return {Object}          insertOp
   */

  async insertMany( data ) {
    const database   = await db();
    const collection = database.collection( this.name );

    data = data.map( d => this[ SANITIZE_OUTPUT ]( d ) );

    return collection.insertMany( data );
  }

  /**
   * delete all records
   * @method clear
   * @return {Object} deleteOp
   */

  async clear() {
    const database   = await db();
    const collection = database.collection( this.name );

    return collection.deleteMany({});
  }

}
