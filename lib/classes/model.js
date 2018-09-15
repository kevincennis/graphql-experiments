const { db }     = require('../db');
const DataLoader = require('dataloader');

const BATCH_LOAD = Symbol('BATCH_LOAD');

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
    const cursor     = collection.find({ _id: { $in: _ids } });
    const results    = await cursor.toArray();
    const map        = new Map;

    // ensure data is loaded in the given order, and sanitize output
    results.forEach( record => map.set( String( record._id ), record ) );

    return _ids.map( _id => {
      const key = String( _id );
      return map.has( key ) ? map.get( key ) : null;
    });
  }

  /**
   * load a single record by _ids
   * @method load
   * @param  {ObjectId} _id – ObjectId of object to load
   * @return {Object}
   */

  async load( _id ) {
    return this.loader.load( _id );
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

    return cursor.toArray();
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
    const now        = new Date();

    return collection.insertOne({ ...data, created: now, updated: now });
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
    const now        = new Date();

    data = data.map( d => ({ ...d, created: now, updated: now }) );

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
