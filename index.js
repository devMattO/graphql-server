const express = require('express');
const graphqlHTTP = require('express-graphql'); // a connect middleware
const app = express();
const PORT = process.env.PORT || 3000;

// function, the actual executor of the schema
const {graphql} = require('graphql');

const pg = require('pg');
const pool = new pg.Pool({
  database: 'graphql_server_db',
  user: 'MatthewOlsen'
}); //how to get pool going with sequelize??

const db = require('./database')(pool);
const DataLoader = require('dataloader');

// the schema to execute
const mySchema = require('./schema');

app.use('/graphql', ( req, res ) => {
  const loaders = {
    usersByIds: new DataLoader(db.getUsersByIds)
  };

  return graphqlHTTP({
    schema: mySchema,
    graphiql: true,
    context: { pool, loaders },
  })(req,res); //huh? <----- what is this
});

app.listen(PORT, ()=>{
  console.log(`Running server on port ${PORT}`);
});
