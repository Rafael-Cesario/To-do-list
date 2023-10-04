"use client";
import StyledComponentsRegistry from "./registry";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/services/client";
import { store } from "@/context/store";
import { Provider as ReduxProvider } from "react-redux";

export const AllProviders = ({ children }: { children: React.ReactNode }) => (
	<ApolloProvider client={client}>
		<ReduxProvider store={store}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</ReduxProvider>
	</ApolloProvider>
);
