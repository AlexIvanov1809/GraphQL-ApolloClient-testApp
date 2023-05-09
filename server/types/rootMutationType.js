const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');
const { PostType, UserType } = require('./types');
const { posts, users } = require('../db/db');
const { uid } = require('uid');

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addPost: {
      type: PostType,
      description: 'Add a post',
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const post = {
          id: uid(),
          title: args.title,
          userId: args.userId,
        };
        posts.push(post);
        return post;
      },
    },

    updatePost: {
      type: PostType,
      description: 'Update a post',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        posts.forEach((post, index) => {
          if (post.userId === args.userId) {
            posts[index].title = args.title;
          }
        });
      },
    },

    addUser: {
      type: UserType,
      description: 'Add a user',
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const user = {
          id: uid(),
          username: args.username,
          age: args.age,
        };
        users.push(user);
        return user;
      },
    },

    updateUser: {
      type: UserType,
      description: 'Update a user',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        users.forEach((user, index) => {
          if (user.id === args.id) {
            users[index].username = args.username;
            users[index].age = args.age;
          }
        });
      },
    },

    removeUser: {
      type: UserType,
      description: 'Remove a user',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const index = users.findIndex((user) => user.id === args.id);
        if (index !== -1) {
          users.splice(index, 1);
        }
      },
    },
  }),
});

module.exports = { RootMutationType };
