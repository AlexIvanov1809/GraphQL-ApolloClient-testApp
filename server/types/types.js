const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');
const { posts, users } = require('../db/db');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represent a user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => {
        return posts.find((post) => user.id === post.userId);
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a post of a user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: (post) => {
        return users.find((user) => user.id === post.userId);
      },
    },
  }),
});

module.exports = { UserType, PostType };
