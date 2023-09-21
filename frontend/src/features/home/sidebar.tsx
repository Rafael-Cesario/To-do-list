import { StyledSidebar } from "./styles/styled-sidebar";

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h2 className="user">Username</h2>

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
