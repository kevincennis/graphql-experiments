const { ObjectId } = require('mongodb');
const users        = require('./models/users');
const addresses    = require('./models/addresses');
const cities       = require('./models/cities');

module.exports = {

  Query: {

    async users( root, args ) {
      return users.find( {}, args );
    },

    async user( root, { _id } ) {
      return users.load( ObjectId( _id ) );
    },

    async addresses( root, args ) {
      return addresses.find( {}, args );
    },

    async address( root, { _id } ) {
      return addresses.load( ObjectId( _id ) );
    },

    async cities( root, args ) {
      return cities.find( {}, args );
    },

    async city( root, { _id } ) {
      return cities.load( ObjectId( _id ) );
    }

  },

  Mutation: {

    async createCity( root, args ) {
      return cities.load( res.insertedId );
    },

    async createAddress( root, args ) {
      const res = await addresses.insert( args );
      return addresses.load( res.insertedId );
    },

    async createUser( root, args ) {
      const res = await users.insert( args );
      return users.load( res.insertedId );
    }

  },

  User: {

    async address({ address_id }) {
      return addresses.load( ObjectId( address_id ) );
    }

  },

  Address: {

    async city({ city_id }) {
      return cities.load( ObjectId( city_id ) );
    },

    async residents({ _id }) {
      return users.find({ address_id: ObjectId( _id ) });
    }

  },

  City: {

    async addresses({ _id }) {
      return addresses.find({ city: ObjectId( _id ) });
    }

  }

};
