const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/stephen-szpak-d171b6/server/dev',
      secret: 'mysecret123',
      debug: true
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))


//mutation CreatePrismaLink {
//  post(
//    description: "Prisma turns your database into a GraphQL API 😎",
//    url: "https://www.prismagraphql.com"
//  ) {
//    id
//  }
//}

//mutation CreateApolloLink {
//  post(
//    description: "The best GraphQL client for React",
//    url: "https://www.apollographql.com/docs/react/"
//  ) {
//    id
// }
//}
