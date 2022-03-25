import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from "./pages/Home"
import Chat from "./pages/Chat"
function App() {

  const httpLink = createHttpLink({
    uri: "/graphql"
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
  })



  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/chat" component={Chat} />
          </div>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
