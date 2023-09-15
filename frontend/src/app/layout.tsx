import StyledComponentsRegistry from "@/lib/styled-components";
import { StyledGlobal } from "@/styles/styled-global";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "To Do List",
	description: "To do list app",
};

export default function RootLayout({ children, authentication }: { children: React.ReactNode; authentication: React.ReactNode }) {
	const isLoggedIn = false;

	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<StyledComponentsRegistry>
					<StyledGlobal />
					{isLoggedIn ? children : authentication}
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
