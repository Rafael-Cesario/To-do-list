"use client";

import { Store } from "@/context/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledListMenu } from "./styles/styled-list-menu";
import { setListMenu } from "../../context/list-slice";

export const ListMenu = () => {
	const { active, isMenuOpen } = useSelector((state: Store) => state.list);
	const [listName, setListName] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	if (!isMenuOpen || !active) return null;

	const saveList = () => {
		if (!listName) return setError("Sua lista precisa de um nome");
		setError("");

		// todo >
		// mutation
		// loading
		// update state
		// clear input
		// notification
	};

	return (
		<StyledListMenu>
			<div className="container">
				<button className="close" onClick={() => dispatch(setListMenu({ isOpen: false }))}>
					x
				</button>

				<h1 className="title">{active.name}</h1>

				<div className="data">
					<label htmlFor="name">Nome</label>
					<input placeholder={active.name} type="text" id="name" value={listName} onChange={(e) => setListName(e.target.value)} />
					<span className="error">{error}</span>
				</div>

				<div className="buttons">
					<button className="save" onClick={() => saveList()}>
						Salvar alterações
					</button>
					<button className="delete">Excluir lista</button>
				</div>
			</div>
		</StyledListMenu>
	);
};
