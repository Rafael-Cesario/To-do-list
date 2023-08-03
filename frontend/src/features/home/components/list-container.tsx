"use client";

import { Store } from "@/context/store";
import { useSelector } from "react-redux";

export const ListContainer = () => {
	const { lists } = useSelector((state: Store) => state.list);
	console.log({ lists });

	return <></>;
};
