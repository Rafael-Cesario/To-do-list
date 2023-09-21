import { cookies } from "next/headers";
import { StyledSidebar } from "./styles/styled-sidebar";
import { CookieKeys, UserCookies } from "@/services/interfaces/cookies";

const getCookies = <Type,>(key: CookieKeys) => {
	const cookieStore = cookies();
	const data: Type = JSON.parse(cookieStore.get(key)?.value || "");
	return data;
};

export const Sidebar = () => {
	const { name } = getCookies<UserCookies>("user");

	return (
		<StyledSidebar>
			<h2 className="user">{name}</h2>

			<h1 className="title">Listas</h1>

			<input type="text" placeholder="Buscar listas" className="search-list" />

			<ul className="list-container">
				<div className="list active">
					<li>Daily</li>
					<span className="task-amount">05</span>
				</div>

				<div className="list">
					<li>Daily</li>
					<span className="task-amount">05</span>
				</div>

				<div className="list">
					<li>Daily</li>
					<span className="task-amount">05</span>
				</div>
			</ul>

			<button className="create-list">Criar nova lista</button>
		</StyledSidebar>
	);
};
