### Setup

```
nvm use
npm i
npm run populate
npm start
```

Navigate to http://localhost:4000/graphql

### Usage

##### Get a User by ID:

```graphql
query {
  getUser( _id:"300000000000000000000000" ) {
    _id,
    name,
    email,
    created,
    updated,
    address {
      _id,
      house_number,
      street,
      created,
      updated,
      city {
        _id,
        name,
        created,
        updated,
        state {
          _id,
          name_short,
          name_long
        }
      },
      residents {
        _id,
        name,
        email
      }
    }
  }
}
```

##### Get users with pagination

```graphql
query {
  getUsers( skip: 1, limit: 1 ) {
    _id,
    name,
    email,
    created,
    updated,
    address {
      _id,
      house_number,
      street,
      created,
      updated,
      city {
        _id,
        name,
        created,
        updated,
        state {
          _id,
          name_short,
          name_long
        }
      },
      residents {
        _id,
        name,
        email
      }
    }
  }
}
```

##### Create a user

```graphql
mutation {
  createUser( fields: { name: "Joe", email: "joe@foo.com", address_id: "300000000000000000000003" } ) {
    _id,
    name,
    email,
    created,
    updated,
    address {
      _id
      house_number
      street
      city_id,
      created,
      updated
    }
  }
}
```

##### Update a user

```graphql
mutation {
  updateUser( _id: "300000000000000000000000", fields: { name: "New Name" } ) {
    _id,
    name,
    email,
    address_id,
    created,
    updated,
    address {
      _id
      house_number
      street
      city_id,
      created,
      updated
    }
  }
}
```
