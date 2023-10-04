"use client";
import { useDispatch } from "react-redux";
import { setActive, setLists } from "../../context/list-slice";
import { IList } from "@/services/interfaces/list";

export const Loader = ({ lists }: { lists: IList[] }) => {
	const dispatch = useDispatch();
	dispatch(setLists({ lists }));
	dispatch(setActive({ newActive: lists[0]}));
	return null;
};
