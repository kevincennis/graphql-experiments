const { GraphQLScalarType, Kind } = require('graphql');
const { ObjectId }                = require('mongodb');

const isValidDate   = value => value instanceof Date && ( +value === +value );
const objectIdRegex = /^[a-f0-9]{24}$/i;

module.exports = {

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'An ISO date string',
    serialize( value ) {
      if ( isValidDate( value ) ) {
        return value.toISOString();
      }

      throw new TypeError( `${ value } is not a valid Date` );
    },
    parseValue( value ) {
      const parsed = new Date( date );

      if ( isValidDate( parsed ) ) {
        return parsed;
      }

      throw new TypeError( `${ value } can not be parsed to Date` );
    },
    parseLiteral( ast ) {
      if ( ast.kind !== Kind.STRING ) {
        throw new TypeError( `${ ast.value } can not be parsed to Date` );
      }

      const parsed = new Date( ast.value );

      if ( isValidDate( parsed ) ) {
        return parsed;
      }

      throw new TypeError( `${ ast.value } can not be parsed to Date` );
    }
  }),

  ObjectId: new GraphQLScalarType({
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
  })

};
