const addresses = require('../../models/addresses');
const users     = require('../../models/users');
const cities    = require('../../models/cities');

module.exports = {

  Query: {

    async addresses( root, args ) {
      return addresses.find( {}, args );
    },

    async address( root, { _id } ) {
      return addresses.load( _id );
    }

  },

  Mutation: {

    async createAddress( root, args ) {
      const res = await addresses.insert( args );
      return addresses.load( res.insertedId );
    }

  },

  Address: {

    async city({ city_id }) {
      return cities.load( city_id );
    },

    async residents({ _id }) {
      return users.find({ address_id: _id });
    }

  }

};
