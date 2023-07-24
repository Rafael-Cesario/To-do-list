import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyle } from "@/styles/global-style";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Study List",
	description: "Crie uma lista de estudos",
};

interface IRootLayout {
	children: React.ReactNode;
	authentication: React.ReactNode;
}

export default function RootLayout(props: IRootLayout) {
	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<StyledComponentsRegistry>
					<GlobalStyle />
					{props.children}
					{props.authentication}
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
