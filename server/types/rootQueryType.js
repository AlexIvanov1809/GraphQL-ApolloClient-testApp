const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = require('graphql');
const { UserType, PostType } = require('./types');
const { posts, users } = require('../db/db');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    getOnePost: {
      type: PostType,
      description: 'A single post',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => posts.find((post) => post.id === args.id),
    },
    getAllPosts: {
      type: new GraphQLList(PostType),
      description: 'List of posts',
      resolve: () => posts,
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      description: 'List of users',
      resolve: () => users,
    },
    getOneUser: {
      type: UserType,
      description: 'List of users',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
  }),
});

module.exports = { RootQueryType };
