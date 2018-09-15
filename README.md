### Setup

```
nvm use
npm i
npm run populate
npm start
```

Navigate to http://localhost:4000/graphql

### Usage

Running a query:

```graphql
query {
  user(_id:"300000000000000000000000") {
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
        state,
        created,
        updated
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

Running a mutation:

```graphql
mutation {
  createUser(name:"Joe", email: "joe@foo.com", address_id: "300000000000000000000003") {
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
