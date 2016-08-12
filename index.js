const express = require('express');
const graphqlHTTP = require('express-graphql'); // a connect middleware
const app = express();
const PORT = process.env.PORT || 3000;
const pg = require('pg');
const pool = new pg.Pool({
  database: 'graphql_server_db',
  user: 'MatthewOlsen'
});
// const DataLoader = require('dataloader');
// const userLoader = new DataLoader(keys => myBatchGetUsers(keys));
// userLoader.load(1)
// .then(user => userLoader.load());


// function, the actual executor of the schema
const {graphql} = require('graphql');

// the schema to execute
const mySchema = require('./schema');

// // get query from cli arguments
// const query = process.argv[2]; //third thing written in cli

// execute mySchema against a query
// graphql(mySchema, query)
// .then( console.log );

app.get('/', (req,res)=> res.send('Hello World'));

app.use('/graphql', graphqlHTTP({
  schema: mySchema,
  graphiql: true,
  context: { pool }
}));

//before connect middleware
//v----v-----vv-----vv----v
// app.get('/graphql', (req,res) => {
//   const { query } = req.query;

//   // execute mySchema against a query
//   //   async operation, returns a promise
//   graphql(mySchema, query)
//     .then(result => res.json(result));
// });

app.listen(PORT, ()=>{
  console.log(`Running server on port ${PORT}`);
});


// :query:
// curl localhost:3000/graphql\?query=%7Bhello%2Ccounter%7D