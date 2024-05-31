import React, { ReactNode } from "react";
import {
  ApolloProvider as ApolloMultiProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const producerLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const consumerLink = new HttpLink({
  uri: "http://localhost:3002/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().apiName === "consumer",
    consumerLink,
    producerLink
  ),
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <ApolloMultiProvider client={client}>{children}</ApolloMultiProvider>;
};
