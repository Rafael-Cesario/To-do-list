"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../context/list-slice";
import { HiSearch } from "react-icons/hi";
import { StyledSearchList } from "../../styles/sidebar/search-list-style";

export const SearchList = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	return (
		<StyledSearchList>
			<HiSearch className="icon" />

			<input
				role="search-list"
				type="text"
				className="search-list"
				placeholder="Procurar lista"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					dispatch(setSearchValue({ newSearchValue: e.target.value }));
				}}
			/>
		</StyledSearchList>
	);
};
