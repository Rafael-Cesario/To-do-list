"use client";
import { useDispatch } from "react-redux";
import { StyledMenu as StyledOptions } from "../styles/options-style";
import { useState } from "react";
import { setOpenOptions } from "../context/options-slice";

export const Options = () => {
	const [optionsIsOpen, setOptionsIsOpen] = useState(false);
	const dispatch = useDispatch();

	return (
		<StyledOptions>
			<button onClick={() => setOptionsIsOpen(!optionsIsOpen)} className="main">
				Opções
			</button>

			{optionsIsOpen && (
				<div className="options">
					<h1 className="title">Opções</h1>

					<button onClick={() => dispatch(setOpenOptions({ isOpen: "rename" }))} className="rename">
						Renomear lista
					</button>

					<button onClick={() => dispatch(setOpenOptions({ isOpen: "delete" }))} className="delete">
						Excluir lista
					</button>
				</div>
			)}
		</StyledOptions>
	);
};
