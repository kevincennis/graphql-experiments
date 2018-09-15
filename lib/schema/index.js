const { importSchema }         = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers                = require('./resolvers');
const path                     = require('path');

const dir      = path.join( __dirname, 'typedefs/_schema.graphql' );
const typeDefs = importSchema( dir );

module.exports = makeExecutableSchema({ typeDefs, resolvers });
