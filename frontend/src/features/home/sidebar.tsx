import { CreateList } from "./components/sidebar/create-list";
import { ListContainer } from "./components/sidebar/list-container";
import { SearchList } from "./components/sidebar/search-list";
import { StyledSidebar } from "./styles/sidebar-style";

export const Sidebar = () => {
	return (
		<StyledSidebar>
			<h1 className="title">Study list</h1>
			<SearchList />

			<div className="container">
				<h2>Listas</h2>
				<CreateList />
			</div>

			<ListContainer />
		</StyledSidebar>
	);
};
