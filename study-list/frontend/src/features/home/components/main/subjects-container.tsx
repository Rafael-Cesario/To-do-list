"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledSubjectsContainer } from "../../styles/main/subjects-container-style";
import { SortSubject } from "../../utils/sort-subjects";
import { setActive } from "../../context/subject-slice";
import { formatDate } from "@/utils/formatDate";

export const SubjectsContainer = () => {
	const { subjects, searchSubjectValue, sortBy } = useSelector((state: Store) => state.subject);
	const sortSubjects = new SortSubject();

	const dispatch = useDispatch();

	const filteredSubjects = subjects.filter((subject) => subject.name.match(new RegExp(searchSubjectValue, "i")));
	const sortedSubjects = sortSubjects[sortBy](filteredSubjects);

	return (
		<StyledSubjectsContainer>
			{sortedSubjects.map((subject) => {
				return (
					<div onClick={() => dispatch(setActive({ subject }))} role="subject" key={subject.subjectID} className="subject">
						<h1 className="title">{subject.name}</h1>

						<div className="info">
							<span className="item">Adicionado {subject.amount}x</span>
							<span className="item">{formatDate(subject.date)}</span>
						</div>
					</div>
				);
			})}
		</StyledSubjectsContainer>
	);
};
