"use client";
import { useSelector } from "react-redux";
import { StyledMain } from "./styles/styled-main";
import { Store } from "@/context/store";
import { tagColors } from "@/styles/palette";

export const Main = () => {
	const { active } = useSelector((state: Store) => state.list);

	const statusMap = {
		NEXT: "Próximas",
		CURRENT: "Em Progresso",
		DONE: "Concluídas",
	};

	const formatDate = (date: Date) => {
		const fullDate = new Date(date);

		const day = fullDate.getDate().toString().padStart(2, "0");
		const month = (fullDate.getMonth() + 1).toString().padStart(2, "0");
		const year = fullDate.getFullYear().toString();

		return `${day}/${month}/${year}`;
	};

	if (!active) return null;

	return (
		<StyledMain>
			{active.tasks.map((task) => (
				<div key={task.id} className="task">
					<div className="top">
						<h1 className="title">{task.title}</h1>
						<span className="date">{formatDate(task.createdAt)}</span>
						<span className={`status ${task.status.toLowerCase()}`}>{statusMap[task.status]}</span>
					</div>

					<p className="description">{task.description}</p>

					<div className="tags">
						{task.tags.map((tag) => (
							<span className="tag" key={tag.id} style={{ backgroundColor: tagColors[tag.color] }}>
								{tag.name}
							</span>
						))}
					</div>
				</div>
			))}
		</StyledMain>
	);
};
