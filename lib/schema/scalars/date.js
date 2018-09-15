const { GraphQLScalarType, Kind } = require('graphql');

const isValid = value => value instanceof Date && ( +value === +value );

module.exports = new GraphQLScalarType({

  name: 'Date',

  description: 'An ISO date string',

  serialize( value ) {
    if ( isValid( value ) ) {
      return value.toISOString();
    }

    throw new TypeError( `${ value } is not a valid Date` );
  },

  parseValue( value ) {
    const parsed = new Date( date );

    if ( isValid( parsed ) ) {
      return parsed;
    }

    throw new TypeError( `${ value } can not be parsed to Date` );
  },

  parseLiteral( ast ) {
    if ( ast.kind !== Kind.STRING ) {
      throw new TypeError( `${ ast.value } can not be parsed to Date` );
    }

    const parsed = new Date( ast.value );

    if ( isValid( parsed ) ) {
      return parsed;
    }

    throw new TypeError( `${ ast.value } can not be parsed to Date` );
  }

});
