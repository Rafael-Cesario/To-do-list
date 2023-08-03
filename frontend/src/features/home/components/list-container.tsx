"use client";

import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { StyledListContainer } from "../styles/list-container-style";

export const ListContainer = () => {
	const { lists, active } = useSelector((state: Store) => state.list);

	return (
		<StyledListContainer>
			{lists.map((list) => (
				<li className={active === list.listID ? "active" : ""} key={list.listID}>
					{list.name}
				</li>
			))}
		</StyledListContainer>
	);
};
