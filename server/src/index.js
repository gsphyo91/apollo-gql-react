const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("../generated/prisma-client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require('./resolvers/Subscription');
const Vote = require("./resolvers/Vote");

// let links = [{
//     id: "Link-0",
//     url: "www.gowtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
//   {
//     id: "Link-1",
//     url: "www.gowtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ];

// let idCount = links.length;
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Vote,
  Subscription,
  // Query: {
  // info: () => "GraphQL Server",
  // feed: () => links,
  // feed: (root, args, context, info) => {
  //   return context.prisma.links();
  // },
  // link: (parent, args) => {
  //   const findLink = links.find((li) => li.id === args.id);
  //   return findLink;
  // },
  // },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
  // Mutation: {
  // createLink: (parent, args) => {
  //   const link = {
  //     id: `Link-${idCount++}`,
  //     description: args.description,
  //     url: args.url,
  //   };
  //   links.push(link);
  //   return link;
  // },
  // createLink: (root, args, context) => {
  //   return context.prisma.createLink({
  //     url: args.url,
  //     description: args.description,
  //   });
  // },
  // updateLink: (parent, args) => {
  //   let index = links.findIndex((li) => li.id === args.id);
  //   links = [
  //     ...links.splice(0, index),
  //     {
  //       id: args.id,
  //       url: args.url,
  //       description: args.description,
  //     },
  //     ...links.splice(index),
  //   ];
  //   return links[index];
  // },
  // deleteLink: (parent, args) => {
  //   let index = links.findIndex(li => li.id === args.id);
  //   const deletedLink = links[index];
  //   links = [
  //     ...links.splice(0, index),
  //     ...links.splice(index)
  //   ]
  //   return {
  //     status: "200",
  //     message: "Success"
  //   };
  // }
  // },
};

const server = new GraphQLServer({
  typeDefs: "./server/src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`http://localhost:4000에서 서버 기동 중!`));