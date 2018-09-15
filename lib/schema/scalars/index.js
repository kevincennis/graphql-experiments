const scalars = require('../scalars');
const fs      = require('fs');
const path    = require('path');

const files = fs.readdirSync( __dirname ).filter( f => f !== 'index.js' );

// load everything in the directory and export as a single object
module.exports = files.reduce( ( out, file ) => {
  const scalar = require( path.join( __dirname, file ) );
  return Object.assign( out, { [ scalar.name ]: scalar } );
}, {} );
