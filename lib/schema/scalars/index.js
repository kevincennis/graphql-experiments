const scalars = require('../scalars');
const fs      = require('fs');
const path    = require('path');

// load everything in the directory and export as a single object

const files = fs.readdirSync( __dirname ).filter( f => f !== 'index.js' );

const out = {};

for ( let file of files ) {
  const scalar = require( path.join( __dirname, file ) );
  out[ scalar.name ] = scalar;
}

module.exports = out;
