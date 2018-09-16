const { GraphQLScalarType, Kind } = require('graphql');

/**
 * create a new GraphQLScalarType based on a regular expression
 * @param {String}   name        – type name
 * @param {String}   description – type description
 * @param {RegExp}   regex       – regular expression
 * @param {String}   error       – opt. error message
 * @param {Function} format      – opt. formatting fn (runs before regex test)
 * @return {GraphQLScalarType}
 */

module.exports = options => {

  const {
    name,
    description,
    regex,
    error = 'Invalid string',
    format = x => x
  } = options;

  return new GraphQLScalarType({

    name,

    description,

    serialize( value ) {
      return format( value );
    },

    parseValue( value ) {
      if ( typeof value !== 'string' ) {
        throw new Error( error );
      }

      const formatted = format( value );

      if ( !regex.test( formatted ) ) {
        throw new Error( error );
      }

      return formatted;
    },

    parseLiteral( ast ) {
      if ( ast.kind !== Kind.STRING ) {
        throw new Error( error );
      }

      const formatted = format( ast.value );

      if ( !regex.test( formatted ) ) {
        throw new Error( error );
      }

      return formatted;
    }

  });

};
