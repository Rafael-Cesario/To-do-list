"use client";
import { useState } from "react";
import { StyledCreateList } from "../styles/create-list-style";

export const CreateList = () => {
	const [createListContainer, setCreateListContainer] = useState(false);
	const [listName, setListName] = useState("");

	return (
		<>
			<button onClick={() => setCreateListContainer(!createListContainer)} className="icon">
				+
			</button>

			{createListContainer && (
				<StyledCreateList>
					<div className="header">
						<h1 className="title">Criar nova lista</h1>

						<button onClick={() => setCreateListContainer(false)} className="close">
							x
						</button>
					</div>

					<form>
						<div className="field">
							<label htmlFor="list-name">Nome</label>
							<input type="text" placeholder="Minha nova lista" id="list-name" onChange={(e) => setListName(e.target.value)} />
						</div>

						<button className="submit">Criar minha lista</button>
					</form>
				</StyledCreateList>
			)}
		</>
	);
};
