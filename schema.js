'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello:{
      type: GraphQLString,
      resolve: _ => 'World'
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
