import React from 'react';
import ReactDOM from 'react-dom';

// apollo client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// styles
import './index.css';

// custom components
import App from './components/App';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById('root')
);
