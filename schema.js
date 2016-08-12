'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');

const person = {
  id: 1,
  first_name: 'Matt',
  last_name: 'Olsen',
  email: 'olsen_matthew@yahoo.com',
  spouse_id: 2
};

const PersonType = new GraphQLObjectType({
  name: 'Person',

  fields: {
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    spouse_id: { type: GraphQLInt }
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
