const { disconnect } = require('../lib/db');
const data           = require('../data/data');
const users          = require('../lib/models/users');
const addresses      = require('../lib/models/addresses');
const cities         = require('../lib/models/cities');

const promises = [ users, addresses, cities ].map( model => {
  return model.clear().then( () => {
    return model.insertMany( data[ model.name ] );
  });
});

Promise.all( promises ).then( () => disconnect() );
