"use client";
import { useSelector } from "react-redux";
import { Options } from "./components/options";
import { StyledHeader } from "./styles/header-style";
import { Store } from "@/context/store";

export const Header = () => {
	const { active } = useSelector((state: Store) => state.list);

	if (!active) return <></>;

	return (
		<StyledHeader>
			<div className="title">
				<h1>{active?.name || "Minha lista"}</h1>
				<p>12 Itens na lista</p>
			</div>

			<div className="menu">
				<Options />
				<input type="text" placeholder="Pesquisar assunto, tag, data..." />
			</div>
		</StyledHeader>
	);
};

// Todo > remove placeholder number of items on the list
