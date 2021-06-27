import schema from './schema';
import resolvers from './resolver';
import { GraphQLServer, PubSub } from 'graphql-yoga';
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context: { pubsub },
});

server.start(() => console.log('Server is running on localhost:4000'));
