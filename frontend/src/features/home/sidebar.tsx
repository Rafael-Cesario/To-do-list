import { cookies } from "next/headers";
import { StyledSidebar } from "./styles/styled-sidebar";
import { CookieKeys, UserCookies } from "@/services/interfaces/cookies";
import { ListContainer } from "./components/sidebar/list-container";
import { CreateList } from "./components/sidebar/create-list";
import { SearchList } from "./components/sidebar/search-list";
import { ListMenu } from "./components/sidebar/list-menu";

const getCookies = <Type,>(key: CookieKeys) => {
	const cookieStore = cookies();
	const data: Type = JSON.parse(cookieStore.get(key)?.value || "");
	return data;
};

export const Sidebar = () => {
	const { name, userID } = getCookies<UserCookies>("user");

	return (
		<StyledSidebar>
			<h2 className="user">{name}</h2>
			<h1 className="title">Listas</h1>
			<SearchList />
			<ListContainer userID={userID} />
			<CreateList userID={userID} />
			<ListMenu />
		</StyledSidebar>
	);
};
