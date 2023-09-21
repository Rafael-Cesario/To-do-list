import { Header } from "@/features/home/header";
import { Main } from "@/features/home/main";
import { Sidebar } from "@/features/home/sidebar";
import { StyledHome } from "@/styles/styled-home";

export default function Home() {
	return (
		<StyledHome>
			<Sidebar />
			<Header />
			<Main />
		</StyledHome>
	);
}
