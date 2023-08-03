"use client";
import { useSelector } from "react-redux";
import { StyledMenu } from "../styles/menu-style";
import { useState } from "react";
import { Store } from "@/context/store";
import { StyledRenameList } from "../styles/rename-list-style";

export const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [renameListContainer, setRenameListContainer] = useState(false);
	const [deleteListContainer, setDeleteListContainer] = useState(false);

	const { lists, active } = useSelector((state: Store) => state.list);

	return (
		<StyledMenu>
			<button onClick={() => setIsOpen(!isOpen)} className="main">
				Menu
			</button>

			{isOpen && (
				<div className="options">
					<h1 className="title">Menu</h1>

					<button onClick={() => setRenameListContainer(true)} className="rename">
						Renomear lista
					</button>

					<button onClick={() => setDeleteListContainer(true)} className="delete">
						Excluir lista
					</button>
				</div>
			)}

			{renameListContainer && (
				<StyledRenameList type={"rename"}>
					<div className="container">
						<button onClick={() => setRenameListContainer(false)} className="close">
							x
						</button>

						<h1 className="title">Renomear lista</h1>
						<p className="description">Altere o nome da lista e clique no botão para salvar.</p>

						<input className="list-name" type="text" placeholder={active?.name} />
						<button className="submit">Salvar alterações</button>
					</div>
				</StyledRenameList>
			)}

			{deleteListContainer && (
				<StyledRenameList type={"delete"}>
					<div className="container">
						<button onClick={() => setDeleteListContainer(false)} className="close">
							x
						</button>

						<h1 className="title">Excluir lista</h1>
						<p className="description">Excluir sua lista irá também excluir todos seus assuntos adicionados a ela.</p>
						<p className="description">Digite o nome da lista atual para confirmar</p>

						<input className="list-name" type="text" placeholder={active?.name} />
						<button className="submit">Salvar alterações</button>
					</div>
				</StyledRenameList>
			)}
		</StyledMenu>
	);
};
