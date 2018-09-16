const { MongoClient } = require('mongodb');
const { database }    = require('../config');

function cache( client ) {
  const close = client.close;

  root.connecting = null;

  client.close = ( ...args ) => {
    cached = null;
    close.call( client, ...args );
  };

  return root.client = client;
}

const root = module.exports = {

  // cached client instance
  client: null,

  // if we're connecting, a promise – otherwise null
  connecting: null,

  // get a mongo client instance
  async connect() {
    if ( root.client !== null ) {
      return root.client;
    }

    if ( root.connecting !== null ) {
      return root.connecting;
    }

    root.connecting = new Promise( ( resolve, reject ) => {
      let host = 'mongodb://';

      if ( database.username && database.password ) {
        host += `${ database.username }:${ database.password }@`;
      }

      host += database.hosts.join(',');
      host += `/${ database.database }`;

      if ( database.replicaSet ) {
        host += `?replicaSet=${ database.replicaSet }`;
      }

      MongoClient
      .connect( host, { useNewUrlParser: true } )
      .then( client => {
        resolve( cache( client ) )
      });
    });

    return root.connecting;
  },

  // disconnect from mongo and trash the cached client
  async disconnect() {
    if ( root.client ) {
      return root.client.close();
    }

    return false;
  },

  // get a db instance (will use cached client when available)
  async db( name ) {
    const client = await root.connect();

    return client.db( name );
  }

};
