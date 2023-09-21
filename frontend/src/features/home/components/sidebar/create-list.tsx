"use client";

import { useState } from "react";
import { StyledCreateList } from "./styles/styled-create-list";

export const CreateList = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<button className="create-list" onClick={() => setIsOpen(true)}>
				Criar nova lista
			</button>

			{isOpen && (
				<StyledCreateList>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1>Criar Lista</h1>

						<div className="field">
							<label htmlFor="name">Nome</label>
							<input autoFocus={true} type="text" id="name" placeholder="Digite um nome para sua lista" />
							<span className="error">Sua lista precisa de um nome</span>
						</div>

						<button className="submit">Criar</button>
					</div>
				</StyledCreateList>
			)}
		</>
	);
};
