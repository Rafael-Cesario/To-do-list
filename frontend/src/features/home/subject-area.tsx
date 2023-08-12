"use client";
import { useDispatch, useSelector } from "react-redux";
import { StyledSubjectArea } from "./styles/subject-area/subject-area-style";
import { Store } from "@/context/store";
import { setActive } from "./context/subject-slice";
import { formatDate } from "@/utils/formatDate";

export const SubjectArea = () => {
	const { active } = useSelector((state: Store) => state.subject);
	const dispatch = useDispatch();

	if (!active) return null;

	return (
		<StyledSubjectArea>
			<div className="container">
				<div className="header">
					<h1 className="title">{active.name}</h1>
					<button onClick={() => dispatch(setActive({ subject: null }))} className="close">
						x
					</button>
				</div>

				<div className="details">
					<span>Adicionado {active.amount}x</span>
					<span>{formatDate(active.date)}</span>
				</div>

				<div className="notes">
					<h2 className="title">Anotações</h2>
					<textarea name="notes" placeholder="Adicione suas anotações aqui. Ex: Links"></textarea>
				</div>

				{/* tags */}
				{/* Delete subject */}
				{/* Save changes */}
			</div>
		</StyledSubjectArea>
	);
};
