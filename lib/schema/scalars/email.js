const factory = require('../utils/regex');

const name        = 'Email';
const description = 'An email address';
const regex       = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const error       = 'Invalid email address';
const format      = x => x.trim().toLowerCase();

module.exports = factory({ name, description, regex, error, format });
