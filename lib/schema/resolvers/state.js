const addresses = require('../../models/addresses');
const users     = require('../../models/users');
const cities    = require('../../models/addresses');
const states    = require('../../models/states');

module.exports = {

  Query: {

    async getStates( root, args ) {
      return states.find( {}, args );
    },

    async getState( root, { _id } ) {
      return states.load( _id );
    }

  },

  Mutation: {

    async createState( root, args ) {
      const res = await cities.insert( args );
      return states.load( res.insertedId );
    },

    async updateState( root, args ) {
      const filter = { _id: args._id };
      const update = { $set: args };
      const res    = await states.update( filter, update );

      return states.load( args._id );
    }

  },

  State: {

    async cities({ _id }) {
      return cities.find({ state_id: _id });
    }

  }

};
