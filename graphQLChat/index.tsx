import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './src/App';
import {name as appName} from './app.json';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloProvider} from '@apollo/react-hooks';
import {OperationDefinitionNode, FragmentDefinitionNode} from 'graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true,
  },
});

const isOperationDefinition = (
  mainDefinition: OperationDefinitionNode | FragmentDefinitionNode,
): mainDefinition is OperationDefinitionNode =>
  mainDefinition.kind === 'OperationDefinition';

const link = split(
  ({query}) => {
    const mainDefinition = getMainDefinition(query);
    return (
      isOperationDefinition(mainDefinition) &&
      mainDefinition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Root />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
