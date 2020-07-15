const { GraphQLServer } = require("graphql-yoga");

let links = [{
    id: "Link-0",
    url: "www.gowtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "Link-1",
    url: "www.gowtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => "GraphQL Server",
    feed: () => links,
    link: (parent, args) => {
      const findLink = links.find(li => li.id === args.id);
      return findLink;
    },
  },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
  Mutation: {
    createLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./server/schema.graphql",
  resolvers,
});
server.start(() => console.log(`http://localhost:4000에서 서버 기동 중!`));