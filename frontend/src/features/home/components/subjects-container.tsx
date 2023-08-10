"use client";
import { Store } from "@/context/store";
import { useSelector } from "react-redux";

export const SubjectsContainer = () => {
	const { subjects } = useSelector((state: Store) => state.subject);

	return (
		<div>
			{subjects.map((subject) => {
				const date = new Date(Number(subject.date));
				const day = String(date.getDay()).padStart(2, "0");
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const subjectDate = `${day}/${month}/${date.getFullYear()}`;

				return (
					<div key={subject.subjectID} className="subject">
						<h1 className="title">{subject.name}</h1>

						<div className="info">
							<span className="item">{subjectDate}</span>
							<span className="item">{subject.amount}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
