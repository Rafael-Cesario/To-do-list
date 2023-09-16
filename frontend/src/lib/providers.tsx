"use client";
import StyledComponentsRegistry from "./styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/services/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
