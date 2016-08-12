'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');

let counter = 13;
let counters = [42, 43];
let counterObj = {
  id: 55,
  value: 42
};
let countersObj = [
  { id: 550, value: 43 },
  { id: 551, value: 44 }
];

const CounterObjType = new GraphQLObjectType({ // had hoisting issue with this, always put before you use it
  name: 'CounterObj',

  fields: {
    id: { type: GraphQLID },
    value: { type: GraphQLInt }
  }
});

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
    },
    counterObj: {
      type: CounterObjType,
      resolve: _ => counterObj
    },
    countersObj: {
      type: new GraphQLList(CounterObjType),
      resolve: _ => countersObj
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
