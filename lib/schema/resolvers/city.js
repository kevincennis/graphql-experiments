const addresses = require('../../models/addresses');
const users     = require('../../models/users');
const cities    = require('../../models/addresses');

module.exports = {

  Query: {

    async getCities( root, args ) {
      return cities.find( {}, args );
    },

    async getCity( root, { _id } ) {
      return cities.load( _id );
    }

  },

  Mutation: {

    async createCity( root, args ) {
      const res = await cities.insert( args );
      return cities.load( res.insertedId );
    },

    async updateCity( root, args ) {
      const filter = { _id: args._id };
      const update = { $set: args };
      const res    = await cities.update( filter, update );

      return cities.load( args._id );
    }

  },

  City: {

    async addresses({ _id }) {
      return addresses.find({ city_id: _id });
    }

  }

};
