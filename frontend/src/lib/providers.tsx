"use client";
import StyledComponentsRegistry from "./styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/services/client";
import { store } from "@/context/store";
import { Provider as ReduxProvider } from "react-redux";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<ReduxProvider store={store}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</ReduxProvider>
		</ApolloProvider>
	);
};
