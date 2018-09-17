const express     = require('express');
const graphqlHTTP = require('express-graphql');
const schema      = require('./lib/schema');
const config      = require('./config');
const cookie      = require('cookie-parser');
const jwt         = require('jsonwebtoken');

const app = express();

app.use( cookie() );

// set an auth token for everyone (obv just for testing purposes)
app.use( ( req, res, next ) => {
  const token = jwt.sign({
    user_id: '555555555555555555555555',
    roles: [
      'users:list',
      'users:show',
      'users:create',
      'users:update',
      'users:read_name'
    ]
  }, config.secret );

  res.cookie( 'graphqlauth', token );

  next();
});

// parse auth cookies
app.use( ( req, res, next ) => {
  try {
    req.token = jwt.verify( req.cookies.graphqlauth, config.secret );
  } catch ( err ) {}

  return next();
});

app.use( '/graphql', graphqlHTTP({ schema, graphiql: true }) );

app.listen( 4000 );
