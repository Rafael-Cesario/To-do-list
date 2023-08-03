"use client";
import { useSelector } from "react-redux";
import { StyledMenu } from "../styles/menu-style";
import { useState } from "react";
import { Store } from "@/context/store";
import { StyledRenameList } from "../styles/rename-list-style";

export const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [renameListContainer, setRenameListContainer] = useState(true);
	const [deleteListContainer, setDeleteListContainer] = useState(false);

	const { lists, active } = useSelector((state: Store) => state.list);
	const currentList = lists.find((list) => list.listID === active);

	return (
		<StyledMenu>
			<button onClick={() => setIsOpen(!isOpen)} className="main">
				Menu
			</button>

			{isOpen && (
				<div className="options">
					<h1 className="title">Menu</h1>
					<button className="rename">Renomear lista</button>
					<button className="delete">Excluir lista</button>
				</div>
			)}

			{renameListContainer && (
				<StyledRenameList>
					<div className="container">
						<button className="close">x</button>

						<h1 className="title">Renomear lista</h1>
						<p className="description">Altere o nome da lista e clique no botão para salvar.</p>

						<input className="list-name" type="text" placeholder={currentList?.name} />
						<button className="submit">Salvar alterações</button>
					</div>
				</StyledRenameList>
			)}
			{deleteListContainer && <></>}
		</StyledMenu>
	);
};
