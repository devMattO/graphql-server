'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

let counter = 13;

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello:{
      type: GraphQLString,
      resolve: _ => 'World'
    },
    counter:{
      type: GraphQLInt,
      resolve: _ => counter
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutation',

  fields: {
    incrementCounter: {
      type: GraphQLInt,
      resolve: _ => ++counter
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = mySchema;
