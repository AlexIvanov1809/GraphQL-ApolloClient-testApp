const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { RootQueryType } = require('./types/rootQueryType');
const { RootMutationType } = require('./types/rootMutationType');

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const PORT = 5000;
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  }),
);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
