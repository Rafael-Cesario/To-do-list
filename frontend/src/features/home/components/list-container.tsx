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
				<div className="container" key={list.listID}>
					<li role="list-item" onClick={() => dispatch(setActive({ newActive: list }))} className={active?.listID === list.listID ? "active" : ""}>
						{list.name}
					</li>

					<button className="options">Opções</button>
					<span className="subjects-counter">12</span>
				</div>
			))}
		</StyledListContainer>
	);
};

// todo > if user has no list return a primary button to create one
