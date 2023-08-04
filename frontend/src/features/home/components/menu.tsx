"use client";
import { StyledMenu } from "../styles/menu-style";
import { useState } from "react";
import { RenameList } from "./rename-list";
import { DeleteList } from "./delete-list";

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

					<button onClick={() => setRenameListContainer(true)} className="rename">
						Renomear lista
					</button>

					<button onClick={() => setDeleteListContainer(true)} className="delete">
						Excluir lista
					</button>
				</div>
			)}

			{renameListContainer && <RenameList props={{ setRenameListContainer }} />}
			{deleteListContainer && <DeleteList props={{ setDeleteListContainer }} />}
		</StyledMenu>
	);
};
