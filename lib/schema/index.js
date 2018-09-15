const fs                       = require('fs');
const resolvers                = require('./resolvers');
const path                     = require('path');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = fs.readFileSync(
  path.join( __dirname, './schema.graphql' ),
  'utf8'
);

module.exports = makeExecutableSchema({ typeDefs, resolvers });
