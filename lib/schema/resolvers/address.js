const addresses = require('../../models/addresses');
const users     = require('../../models/users');
const cities    = require('../../models/cities');

module.exports = {

  Query: {

    async getAddresses( root, args ) {
      return addresses.find( {}, args );
    },

    async getAddress( root, { _id } ) {
      return addresses.load( _id );
    }

  },

  Mutation: {

    async createAddress( root, { fields } ) {
      const res = await addresses.insert( fields );
      return addresses.load( res.insertedId );
    },

    async updateAddress( root, { _id, fields } ) {
      const filter = { _id: _id };
      const update = { $set: fields };
      const res    = await addresses.update( filter, update );

      return addresses.load( _id );
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
