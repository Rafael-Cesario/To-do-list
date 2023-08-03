"use client";
import { StyledMenu } from "../styles/menu-style";
import { useState } from "react";

export const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [renameListContainer, setRenameListContainer] = useState(false);
	const [deleteListContainer, setDeleteListContainer] = useState(false);

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

			{renameListContainer && <></>}
			{deleteListContainer && <></>}
		</StyledMenu>
	);
};
