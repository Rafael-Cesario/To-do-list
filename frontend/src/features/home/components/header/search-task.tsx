"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../context/search-task-slice";

export const SearchTask = () => {
	const { filter } = useSelector((state: Store) => state.searchTask);
	const dispatch = useDispatch();

	return <input value={filter} onChange={(e) => dispatch(setFilter(e.target.value))} className="search-task" type="text" placeholder="Buscar tarefa, tag, data ou status" data-cy="search-task" />;
};
