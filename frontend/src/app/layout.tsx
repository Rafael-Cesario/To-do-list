import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Providers } from "@/lib/providers";
import { StyledGlobal } from "@/styles/styled-global";
import { Roboto_Slab } from "next/font/google";
import { Notification } from "@/components/notification";

const roboto_slab = Roboto_Slab({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "To Do List",
	description: "To do list app",
};

const getUserCookies = () => {
	const cookieStore = cookies();
	const cookieData = cookieStore.get("user");
	if (!cookieData) return false;

	// todo > check if token is valid
	// const { token }: UserCookies = JSON.parse(cookieData.value);

	return true;
};

export default function RootLayout({ children, authentication }: { children: React.ReactNode; authentication: React.ReactNode }) {
	const isLoggedIn = getUserCookies();

	return (
		<html lang="pt-br">
			<body className={roboto_slab.className}>
				<Providers>
					<StyledGlobal />
					<Notification />
					{isLoggedIn ? children : authentication}
				</Providers>
			</body>
		</html>
	);
}
