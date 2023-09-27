"use client";

import { Store } from "@/context/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledListMenu } from "./styles/styled-list-menu";
import { setListMenu } from "../../context/list-slice";

export const ListMenu = () => {
	const { active, isMenuOpen } = useSelector((state: Store) => state.list);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	if (!isMenuOpen || !active) return null;

	return (
		<StyledListMenu>
			<div className="container">
				<button className="close" onClick={() => dispatch(setListMenu({ isOpen: false }))}>
					x
				</button>

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
