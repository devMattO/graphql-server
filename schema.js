'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

let counter = 13;
let counters = [42, 43];

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
    },
    counters:{
      type: new GraphQLList(GraphQLInt),
      resolve: _ => counters
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
