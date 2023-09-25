"use client";

import { useDispatch, useSelector } from "react-redux";
import { setListFilter } from "../../context/list-slice";
import { Store } from "@/context/store";

export const SearchList = () => {
	const { filter } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	return (
		<input
			type="text"
			placeholder="Buscar listas"
			className="search-list"
			value={filter}
			onChange={(e) => {
				dispatch(setListFilter({ filter: e.target.value }));
			}}
		/>
	);
};
