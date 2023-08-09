"use client";
import { useState } from "react";
import { StyledCreateSubject } from "../styles/create-subject-style";

export const CreateSubject = () => {
	const [subjectName, setSubjectName] = useState("");
	const [feedback, setFeedback] = useState({ type: "", message: "" });

	const createSubject = () => {
		if (!subjectName) return setFeedback({ type: "error", message: "Escolha um nome ou titulo antes de clicar em adicionar" });
		setFeedback({ type: "success", message: "Seu novo assunto foi adicionado" });
	};

	return (
		<StyledCreateSubject>
			{feedback.message && (
				<div className={feedback.type}>
					<span className="message">{feedback.message}</span>
					<button onClick={() => setFeedback({ type: "", message: "" })} className="close">
						x
					</button>
				</div>
			)}

			<div className="create">
				<input
					value={subjectName}
					onChange={(e) => setSubjectName(e.target.value)}
					onKeyUp={(e) => e.key === "Enter" && createSubject()}
					className="name"
					type="text"
					placeholder="Digite aqui seu novo assunto de estudos"
				/>
				<button onClick={() => createSubject()} className="submit">
					Adicionar
				</button>
			</div>
		</StyledCreateSubject>
	);
};
