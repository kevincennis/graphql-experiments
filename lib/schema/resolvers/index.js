const scalars = require('../scalars');
const fs      = require('fs');
const path    = require('path');

const files = fs.readdirSync( __dirname ).filter( f => f !== 'index.js' );

// load everything in the directory and merge into a single resolver map
module.exports = files.reduce( ( out, file ) => {
  const resolver = require( path.join( __dirname, file ) );
  const keys     = Object.keys( resolver );

  for ( let key of keys ) {
    Object.assign( ( out[ key ] = ( out[ key ] || {} ) ), resolver[ key ] );
  }

  return out;
}, { ...scalars } );
