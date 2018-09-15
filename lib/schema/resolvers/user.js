const users     = require('../../models/users');
const addresses = require('../../models/addresses');

module.exports = {

  Query: {

    async users( root, args ) {
      return users.find( {}, args );
    },

    async user( root, { _id } ) {
      return users.load( _id );
    }

  },

  Mutation: {

    async createUser( root, args ) {
      const res = await users.insert( args );
      return users.load( res.insertedId );
    },

    async updateUser( root, args ) {
      const filter = { _id: args._id };
      const update = { $set: args };
      const res    = await users.update( filter, update );

      return users.load( args._id );
    }

  },

  User: {

    async address({ address_id }) {
      return addresses.load( address_id );
    }

  }

};
