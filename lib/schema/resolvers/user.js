const users     = require('../../models/users');
const addresses = require('../../models/addresses');

module.exports = {

  Query: {

    async getUsers( root, args ) {
      return users.find( {}, args );
    },

    async getUser( root, { _id } ) {
      return users.load( _id );
    }

  },

  Mutation: {

    async createUser( root, { fields } ) {
      const res = await users.insert( fields );
      return users.load( res.insertedId );
    },

    async updateUser( root, { _id, fields } ) {
      const filter = { _id: _id };
      const update = { $set: fields };
      const res    = await users.update( filter, update );

      return users.load( _id );
    }

  },

  User: {

    async address({ address_id }) {
      return addresses.load( address_id );
    }

  }

};
