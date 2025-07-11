import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/user/',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('adminToken');
    console.log('Token enviado en headers:', token);
    return {
        headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
        }
    };
});
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;
