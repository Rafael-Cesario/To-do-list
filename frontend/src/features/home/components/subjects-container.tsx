"use client";
import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { StyledSubjectsContainer } from "../styles/subjects-container-style";

export const SubjectsContainer = () => {
	const { subjects } = useSelector((state: Store) => state.subject);

	return (
		<StyledSubjectsContainer>
			{subjects.map((subject) => {
				const date = new Date(Number(subject.date));
				const day = String(date.getDay()).padStart(2, "0");
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const subjectDate = `${day}/${month}/${date.getFullYear()}`;

				return (
					<div key={subject.subjectID} className="subject">
						<h1 className="title">{subject.name}</h1>

						<div className="info">
							<span className="item">Adicionado {subject.amount}x</span>
							<span className="item">{subjectDate}</span>
						</div>
					</div>
				);
			})}
		</StyledSubjectsContainer>
	);
};
