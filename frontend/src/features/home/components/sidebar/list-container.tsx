"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledListContainer } from "../../styles/sidebar/list-container-style";
import { setActive } from "../../context/list-slice";
import { Options } from "./options";

export const ListContainer = () => {
	const { lists, active, searchValue } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	const filter = new RegExp(searchValue, "i");
	const filteredLists = lists.filter((list) => list.name.match(filter));

	return (
		<StyledListContainer>
			{filteredLists.map((list) => (
				<div role="list-item" className={`container ${active.listID === list.listID && "active"}`} key={list.listID}>
					<li onClick={() => dispatch(setActive({ newActive: list }))}>{list.name}</li>
					<Options list={list} />
					<span className="subjects-counter">{list.subjectsLength}</span>
				</div>
			))}
		</StyledListContainer>
	);
};

// todo > if user has no list return a primary button to create one
