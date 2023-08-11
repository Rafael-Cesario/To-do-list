"use client";
import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { RenameList } from "./rename-list";
import { DeleteList } from "./delete-list";

export const ListActions = () => {
	const { isOpen } = useSelector((state: Store) => state.options);

	return (
		<>
			{isOpen === "rename" && <RenameList />}
			{isOpen === "delete" && <DeleteList />}
		</>
	);
};
