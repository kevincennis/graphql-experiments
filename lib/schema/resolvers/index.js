const scalars = require('../scalars');
const fs      = require('fs');
const path    = require('path');

// load everything in the directory and merge into a single resolver map

const files = fs.readdirSync( __dirname ).filter( f => f !== 'index.js' );
const merge = [ 'Query', 'Mutation' ];
const out   = { Mutation: {}, Query: {}, ...scalars };

for ( let name of files ) {
  const resolver = require( path.join( __dirname, name ) );

  // merge in Query and Mutation methods with existing Query/Mutation objects
  for ( let prop of merge ) {
    Object.assign( out[ prop ], resolver[ prop ] );
  }

  // merge in custom type resolvers at the top level
  const types = Object.keys( resolver ).filter( t => !merge.includes( t ) );

  for ( let type of types ) {
    Object.assign( out, { [ type ]: resolver[ type ] } );
  }
};

module.exports = out;
