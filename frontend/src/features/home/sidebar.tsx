import { CreateList } from "./components/create-list";
import { ListContainer } from "./components/list-container";
import { StyledSidebar } from "./styles/sidebar-style";

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h1 className="title">Study list</h1>
			<input className="search" type="text" placeholder="Buscar lista" />

			<div className="container">
				<h2>Listas</h2>
				<CreateList />
			</div>

			<ListContainer />
		</StyledSidebar>
	);
};

// Todo >
// Search for lists
