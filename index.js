const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// function, the actual executor of the schema
const {graphql} = require('graphql');

// the schema to execute
const mySchema = require('./schema');

// get query from cli arguments
const query = process.argv[2]; //third thing written in cli

// execute mySchema against a query
// graphql(mySchema, query)
// .then( console.log );

app.get('/', (req,res)=> res.send('Hello World'));

app.listen(PORT, ()=>{
  console.log(`Running server on port ${PORT}`);
});
