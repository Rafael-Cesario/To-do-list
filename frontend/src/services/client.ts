import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: process.env.DATABASE_URL || "http://localhost:4000",
	cache: new InMemoryCache(),
});
