const factory = require('../utils/regex');

const name        = 'StateAbbreviation';
const description = 'An state abbreviation';
const regex       = /^[A-Z]{2}$/;
const error       = 'Invalid state abbreviation';
const format      = x => x.trim().toUpperCase();

module.exports = factory({ name, description, regex, error, format });
