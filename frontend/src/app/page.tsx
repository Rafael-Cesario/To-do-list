import { ListActions } from "@/features/home/components/list-actions";
import { Loader } from "@/features/home/components/loader";
import { Logout } from "@/features/home/components/logout";
import { Header } from "@/features/home/header";
import { Sidebar } from "@/features/home/sidebar";
import { StyledErrorPage } from "@/features/home/styles/error-page-style";
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
	try {
		const { data } = await client.query<RGetLists, IGetLists>({
			query: listQueries.GET_LISTS,
			variables: { userID },
		});

		return { lists: data.getLists };

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return { lists: [], error: error.message };
	}
};

export default async function Home() {
	const userCookies: IUserCookies = getCookies("user");
	const { lists, error } = await queryLists(userCookies.userID);

	if (error) {
		return (
			<StyledErrorPage>
				<div className="container">
					<h1 className="title">Ops, algo deu errado mas não foi sua culpa</h1>
					<p className="message">Um erro ocorreu tentado carregar suas listas, por favor clique em sair e faça login novamente</p>
					<Logout />
				</div>
			</StyledErrorPage>
		);
	}

	return (
		<StyledHome>
			<Loader lists={lists} />
			<Sidebar />
			<Header />
			<ListActions />
		</StyledHome>
	);
}
