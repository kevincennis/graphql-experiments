const addresses = require('../../models/addresses');
const users     = require('../../models/users');
const cities    = require('../../models/addresses');

module.exports = {

  Query: {

    async cities( root, args ) {
      return cities.find( {}, args );
    },

    async city( root, { _id } ) {
      return cities.load( _id );
    }

  },

  Mutation: {

    async createCity( root, args ) {
      const res = await cities.insert( args );
      return cities.load( res.insertedId );
    }

  },

  City: {

    async addresses({ _id }) {
      return addresses.find({ city: _id });
    }

  }

};
