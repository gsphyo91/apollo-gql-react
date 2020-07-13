const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link{
  id: ID!
  description: String!
  url: String!
}
`;

let links = [
  {
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

const resolvers = {
  Query: {
    info: () => "GraphQL Server",
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`http://localhost:4000에서 서버 기동 중!`));
