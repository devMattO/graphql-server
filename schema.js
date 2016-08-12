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



// const person = humps.camelizeKeys({
//   id: 1,
//   firstName: 'Matt',
//   lastName: 'Olsen',
//   email: 'olsen_matthew@yahoo.com',
//   spouseId: 2
// });

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
      resolve: ( obj, args, { pool }, info ) => pool.query(`
        select * from spouses
        where id = $1
      `, [obj.spouseId]).then(result => humps.camelizeKeys(result.rows[0])) }
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
      resolve: ( obj, args, { pool }, info ) => pool.query(`
        select * from spouses
        where id = 1
      `[args.id])
      .then(result => humps.camelizeKeys(result.rows[0]))
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
