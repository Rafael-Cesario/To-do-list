"use client";
import { useDispatch } from "react-redux";
import { setLists } from "../context/list-slice";
import { IList } from "@/services/interfaces/list";

export const Loader = ({ lists }: { lists: IList[] }) => {
	const dispatch = useDispatch();
	dispatch(setLists({ lists }));
	return null;
};
