/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, concat } from "@apollo/client/index.js";
import {hydrateRoot} from "react-dom/client";

function Client() {

    const httpLink = createHttpLink({ uri: 'http://localhost:7000/graphql' });
    const authLink = new ApolloLink((operation, forward) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            operation.setContext({
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
        }
        return forward(operation);
    });

    const client = new ApolloClient({
        // @ts-ignore
        cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
        link: concat(authLink, httpLink),
    });

    return (
        <ApolloProvider client={client}>
            <RemixBrowser />
        </ApolloProvider>
    );
}

hydrateRoot(document, <Client />);