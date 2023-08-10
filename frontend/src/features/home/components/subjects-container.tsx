"use client";

import { Store } from "@/context/store";
import { useSelector } from "react-redux";

export const SubjectsContainer = () => {
	const { subjects } = useSelector((state: Store) => state.subject);

	return (
		<div>
			{subjects.map((subject) => (
				<div key={subject.subjectID} className="subject">
					<h1 className="title">{subject.name}</h1>

					<div className="info">
						<span>{subject.date}</span>
						<span>{subject.amount}</span>
					</div>
				</div>
			))}
		</div>
	);
};
