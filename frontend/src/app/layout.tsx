import StyledComponentsRegistry from "@/lib/registry";
import { cookies } from "next/headers";
import { GlobalStyle } from "@/styles/global-style";
import { Roboto_Slab } from "next/font/google";
import type { Metadata } from "next";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Study List",
	description: "Crie uma lista de estudos",
};

interface IRootLayout {
	children: React.ReactNode;
	authentication: React.ReactNode;
}

const CookieKeys = {
	user: "user",
};

const getUserCookies = () => {
	const cookieStore = cookies();
	return cookieStore.get(CookieKeys.user);
};

export default function RootLayout(props: IRootLayout) {
	const hasUser = getUserCookies();

	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<StyledComponentsRegistry>
					<GlobalStyle />
					{hasUser ? props.children : props.authentication}
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
