"use client";
import { useDispatch } from "react-redux";
import { StyledMenu as StyledOptions } from "../../styles/options-style";
import { useState } from "react";
import { setOpenOptions } from "../../context/options-slice";
import { IList } from "@/services/interfaces/list";
import { setActive } from "../../context/list-slice";

interface Props {
	list: IList;
}

export const Options = ({ list }: Props) => {
	const [optionsIsOpen, setOptionsIsOpen] = useState(false);
	const dispatch = useDispatch();

	const openListActions = (action: "rename" | "delete") => {
		dispatch(setActive({ newActive: list }));
		dispatch(setOpenOptions({ isOpen: action }));
		setOptionsIsOpen(false);
	};

	return (
		<StyledOptions>
			<button role="open-options" onClick={() => setOptionsIsOpen(!optionsIsOpen)} className="main">
				Opções
			</button>

			{optionsIsOpen && (
				<div className="options">
					<h1 className="title">Opções</h1>
					<button className="close" onClick={() => setOptionsIsOpen(false)}>
						x
					</button>

					<button role="rename" onClick={() => openListActions("rename")} className="rename">
						Renomear lista
					</button>

					<button role="delete" onClick={() => openListActions("delete")} className="delete">
						Excluir lista
					</button>
				</div>
			)}
		</StyledOptions>
	);
};
