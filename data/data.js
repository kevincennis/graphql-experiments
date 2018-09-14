const { ObjectId } = require('mongodb');

module.exports = {
  "users": [
    {
      "_id": ObjectId("300000000000000000000000"),
      "name": "John",
      "email": "john@foo.com",
      "address_id": ObjectId("300000000000000000000003")
    },
    {
      "_id": ObjectId("300000000000000000000001"),
      "name": "Jane",
      "email": "jane@foo.com",
      "address_id": ObjectId("300000000000000000000004")
    },
    {
      "_id": ObjectId("300000000000000000000002"),
      "name": "Bob",
      "email": "bob@foo.com",
      "address_id": ObjectId("300000000000000000000004")
    }
  ],
  "addresses": [
    {
      "_id": ObjectId("300000000000000000000003"),
      "house_number": "1",
      "street": "First Street",
      "city_id": ObjectId("300000000000000000000006")
    },
    {
      "_id": ObjectId("300000000000000000000004"),
      "house_number": "2",
      "street": "Second Street",
      "city_id": ObjectId("300000000000000000000005")
    }
  ],
  "cities": [
    {
      "_id": ObjectId("300000000000000000000005"),
      "name": "Boston",
      "state": "MA"
    },
    {
      "_id": ObjectId("300000000000000000000006"),
      "name": "New York",
      "state": "NY"
    }
  ]
}
