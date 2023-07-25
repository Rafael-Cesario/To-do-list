"use client";
import { ApolloProvider } from "@apollo/client";
import StyledComponentsRegistry from "./registry";
import { client } from "@/services/client";

export const AllProviders = ({ children }: { children: React.ReactNode }) => (
	<ApolloProvider client={client}>
		<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
	</ApolloProvider>
);
