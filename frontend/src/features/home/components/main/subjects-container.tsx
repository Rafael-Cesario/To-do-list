"use client";
import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { StyledSubjectsContainer } from "../../styles/main/subjects-container-style";
import { SortSubject } from "../../utils/sort-subjects";

export const SubjectsContainer = () => {
	const { subjects, searchSubjectValue, sortBy } = useSelector((state: Store) => state.subject);
	const sortSubjects = new SortSubject();

	const filteredSubjects = subjects.filter((subject) => subject.name.match(new RegExp(searchSubjectValue, "i")));
	const sortedSubjects = sortSubjects[sortBy](filteredSubjects);

	return (
		<StyledSubjectsContainer>
			{sortedSubjects.map((subject) => {
				const date = new Date(Number(subject.date));
				const day = String(date.getDay()).padStart(2, "0");
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const subjectDate = `${day}/${month}/${date.getFullYear()}`;

				return (
					<div role="subject" key={subject.subjectID} className="subject">
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
