"use client";
import { useDispatch, useSelector } from "react-redux";
import { StyledSubjectArea } from "./styles/subject-area/subject-area-style";
import { Store } from "@/context/store";
import { setActive } from "./context/subject-slice";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { ISubject } from "@/services/interfaces/subjects";
import { produce } from "immer";

type SubjectKeys = "name" | "notes";

const defaultSubject: ISubject = {
	subjectID: "",
	listID: "",
	name: "",
	amount: 1,
	date: "",
	notes: "",
	tags: [],
};

export const SubjectArea = () => {
	const { active } = useSelector((state: Store) => state.subject);
	const [subjectValues, setSubjectValues] = useState<ISubject>(active || defaultSubject);
	const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string }>({ type: "error", message: "" });

	const dispatch = useDispatch();

	const updateSubjectValue = (key: SubjectKeys, newValue: string) => {
		const newState = produce(subjectValues, (draft) => {
			draft[key] = newValue;
		});

		setSubjectValues(newState);
	};

	const saveChanges = () => {
		console.log({ subjectValues });

		if (!subjectValues.name) return setFeedback({ type: "error", message: "Seu assunto precisa de um nome" });

		setFeedback({ type: "success", message: "Suas alterações foram salvas" });
	};

	useEffect(() => {
		active && setSubjectValues(active);
	}, [active]);

	if (!active) return null;

	return (
		<StyledSubjectArea>
			<div className="container">
				<div className="header">
					<button onClick={() => dispatch(setActive({ subject: null }))} className="close">
						x
					</button>

					<input contentEditable="true" className="title" value={subjectValues.name ?? active.name} onChange={(e) => updateSubjectValue("name", e.target.value)} />
				</div>

				<div className="details">
					<span>Adicionado {subjectValues.amount}x</span>
					<span>{formatDate(subjectValues.date)}</span>
				</div>

				<div className="notes">
					<h2 className="title">Anotações</h2>
					<textarea name="notes" placeholder="Adicione suas anotações aqui. Ex: Links" value={subjectValues.notes} onChange={(e) => updateSubjectValue("notes", e.target.value)}></textarea>
				</div>

				{/* tags */}
				{/* Delete subject */}
				{/* Save changes */}

				{feedback.message && (
					<div className={feedback.type + " feedback"}>
						<p>{feedback.message}</p>

						<button onClick={() => setFeedback({ type: "error", message: "" })} className="close">
							x
						</button>
					</div>
				)}

				<div className="buttons">
					<button className="delete">Excluir assunto</button>
					<button onClick={() => saveChanges()} className="save">
						Salvar alterações
					</button>
				</div>
			</div>
		</StyledSubjectArea>
	);
};
