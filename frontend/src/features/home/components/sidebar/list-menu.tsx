"use client";

import { Store } from "@/context/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StyledListMenu } from "./styles/styled-list-menu";

export const ListMenu = () => {
	const { active } = useSelector((state: Store) => state.list);
	const [error, setError] = useState("");

	if (!active) return null;

	return (
		<StyledListMenu>
			<div className="container">
				<button className="close">x</button>

				<h1 className="title">{active.name}</h1>

				<div className="data">
					<label htmlFor="name">Nome</label>
					<input placeholder={active.name} type="text" id="name" />
					<span className="error">{error}</span>
				</div>

				<div className="buttons">
					<button className="save">Salvar alterações</button>
					<button className="delete">Excluir lista</button>
				</div>
			</div>
		</StyledListMenu>
	);
};
