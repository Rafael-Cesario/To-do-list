import { Loader } from "@/features/home/components/loader";
import { Sidebar } from "@/features/home/sidebar";
import { client } from "@/services/client";
import { CookieKeys, IUserCookies } from "@/services/interfaces/cookies";
import { IGetLists, RGetLists } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { StyledHome } from "@/styles/home-style";
import { cookies } from "next/headers";

const getCookies = (key: CookieKeys) => {
	const store = cookies();
	const data = store.get(key);
	const userCookies = JSON.parse(data?.value || "");
	return userCookies;
};

const queryLists = async (userID: string) => {
	const { data } = await client.query<RGetLists, IGetLists>({
		query: listQueries.GET_LISTS,
		variables: { userID },
	});

	return data.getLists;
};

export default async function Home() {
	const userCookies: IUserCookies = getCookies("user");
	const lists = await queryLists(userCookies.userID);

	return (
		<StyledHome>
			<Loader lists={lists} />
			<Sidebar />
		</StyledHome>
	);
}
