"use client";
import { useState } from "react";
import { StyledDelete } from "./style/delete-style";

export const Delete = () => {
	const [deleteContainer, setDeleteContainer] = useState(true);

	return (
		<StyledDelete>
			<button onClick={() => setDeleteContainer(true)} className="delete">
				Excluir assunto
			</button>

			<div className="container-delete-subject">
				<div className="confirmation">
					<p>Quer mesmo excluir este assunto?</p>

					<div className="options">
						<button>Sim</button>
						<button>Não</button>
					</div>
				</div>
			</div>
		</StyledDelete>
	);
};
