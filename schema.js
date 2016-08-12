'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');
const humps = require('humps');

const person = humps.camelizeKeys({
  id: 1,
  firstName: 'Matt',
  lastName: 'Olsen',
  email: 'olsen_matthew@yahoo.com',
  spouseId: 2
});

const PersonType = new GraphQLObjectType({
  name: 'Person',

  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    spouseId: { type: GraphQLInt }
  }
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',

  fields: {
    person: {
      type: PersonType,
      resolve: _ => person
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
