"use client";
import { useState } from "react";
import { CreateList } from "./components/sidebar/create-list";
import { ListContainer } from "./components/sidebar/list-container";
import { SearchList } from "./components/sidebar/search-list";
import { StyledCloseSidebar, StyledSidebar } from "./styles/sidebar/sidebar-style";

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(true);

	if (!isOpen)
		return (
			<StyledCloseSidebar>
				<button onClick={() => setIsOpen(true)} className="open"></button>
			</StyledCloseSidebar>
		);

	return (
		<StyledSidebar>
			<div className="header">
				<h1 className="title">Study list</h1>

				<button onClick={() => setIsOpen(false)} className="close">
					x
				</button>
			</div>

			<SearchList />

			<div className="container">
				<h2>Listas</h2>
				<CreateList />
			</div>

			<ListContainer />
		</StyledSidebar>
	);
};
