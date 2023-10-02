"use client";
import { useSelector } from "react-redux";
import { StyledMain } from "./styles/styled-main";
import { Store } from "@/context/store";
import { tagColors } from "@/styles/palette";
import { ITask } from "@/services/interfaces/task";

export const Main = () => {
	const { active, filter } = useSelector((state: Store) => ({ ...state.list, ...state.searchTask }));

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

	const filterTask = (task: ITask) => {
		const matchStatus = statusMap[task.status].match(new RegExp(filter, "i"));
		if (matchStatus) return task;

		const matchTitle = task.title.match(new RegExp(filter, "i"));
		if (matchTitle) return task;

		const matchDate = formatDate(task.createdAt).includes(filter);
		if (matchDate) return task;

		const matchTag = task.tags.find((tag) => tag.name.match(new RegExp(filter, "i")));
		if (matchTag) return task;
	};

	if (!active) return null;

	return (
		<StyledMain>
			{active.tasks
				.filter((task) => filterTask(task))
				.map((task) => (
					<div key={task.id} className="task">
						<div className="top">
							<h1 data-cy="task-title" className="title">
								{task.title}
							</h1>
							<span className="date">{formatDate(task.createdAt)}</span>
							<span data-cy="task-status" className={`status ${task.status.toLowerCase()}`}>
								{statusMap[task.status]}
							</span>
						</div>

						<p data-cy="task-description" className="description">
							{task.description}
						</p>

						<div className="tags" data-cy="task-tags">
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
