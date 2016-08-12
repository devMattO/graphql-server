'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');
const humps = require('humps');
const db = require('./database.js');


const PersonType = new GraphQLObjectType({
  name: 'Person',

  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    spouseId: { type: GraphQLInt },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    spouse: {
      type: PersonType,
      resolve: ( obj, args, { pool }, info ) =>
        db(pool).getUserById(obj.spouseId)
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',

  fields: {
    person: {
      type: PersonType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      // 3rd is context ------v
      resolve: ( obj, args, { pool }, info ) => db(pool).getUserById(args.id)
    },
    people: {
      type: new GraphQLList(PersonType),
      resolve: ( obj, args, { pool } ) => db(pool).getUsers()
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
