// function, the actual executor of the schema
const {graphql} = require('graphql');

// the schema to execute
const mySchema = require('./schema');

// get query from cli arguments
const query = process.argv[2]; //third thing written in cli

// execute mySchema against a query
graphql(mySchema, query)
.then((data)=>{
  console.log(data,'<----data');
});