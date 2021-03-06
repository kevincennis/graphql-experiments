const { GraphQLScalarType, Kind } = require('graphql');
const { ObjectId }                = require('mongodb');

const objectIdRegex = /^[a-f0-9]{24}$/i;

module.exports = new GraphQLScalarType({

  name: 'ObjectId',

  description: 'A MongoDB identifier',

  serialize( value ) {
    if ( value instanceof ObjectId ) {
      return value.toString();
    }

    throw new TypeError( `${ value } is not a valid ObjectId` );
  },

  parseValue( value ) {
    if ( typeof value === 'string' && objectIdRegex.test( value ) ) {
      return ObjectId( value );
    }

    throw new TypeError( `${ value } can not be parsed to ObjectId` );
  },

  parseLiteral( ast ) {
    if ( ast.kind !== Kind.STRING ) {
      throw new TypeError( `${ ast.value } can not be parsed to ObjectId` );
    }

    if ( objectIdRegex.test( ast.value ) ) {
      return ObjectId( ast.value );
    }

    throw new TypeError( `${ ast.value } can not be parsed to ObjectId` );
  }

});
