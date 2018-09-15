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
    },

    async updateAddress( root, args ) {
      const filter = { _id: args._id };
      const update = { $set: args };
      const res    = await addresses.update( filter, update );

      return addresses.load( args._id );
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
