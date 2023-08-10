"use client";
import { useSelector } from "react-redux";
import { StyledHeader } from "./styles/header-style";
import { Store } from "@/context/store";

export const Header = () => {
	const { active } = useSelector((state: Store) => state.list);
	const { subjects } = useSelector((state: Store) => state.subject);

	if (!active) return <></>;

	return (
		<StyledHeader>
			<div className="title">
				<h1>{active.name || "Minha lista"}</h1>
				<p>{subjects.length} Itens na lista</p>
			</div>
		</StyledHeader>
	);
};

// Todo > remove placeholder number of items on the list
