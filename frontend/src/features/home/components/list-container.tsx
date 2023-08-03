"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledListContainer } from "../styles/list-container-style";
import { setActive } from "../context/list-slice";

export const ListContainer = () => {
	const { lists, active } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	return (
		<StyledListContainer>
			{lists.map((list) => (
				<li
					role="list-item"
					onClick={() => dispatch(setActive({ newActive: list}))}
					className={active?.listID === list.listID ? "active" : ""}
					key={list.listID}>
					{list.name}
				</li>
			))}
		</StyledListContainer>
	);
};
