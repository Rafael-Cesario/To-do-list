"use client";
import { useDispatch, useSelector } from "react-redux";
import { StyledTaskContainer } from "./styles/styled-task-container";
import { Store } from "@/context/store";
import { ITask } from "@/services/interfaces/task";
import { setActive } from "../../context/task-slice";
import { tagColors } from "@/styles/palette";

export const TaskContainer = () => {
	const { active } = useSelector((state: Store) => state.list);
	const { filter } = useSelector((state: Store) => state.task);

	const dispatch = useDispatch();

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

	// todo > Component for empty tasks
	if (!active?.tasks) return null;

	return (
		<StyledTaskContainer data-cy="task-container">
			{active.tasks
				.filter((task) => filterTask(task))
				.map((task) => (
					<div onClick={() => dispatch(setActive(task))} key={task.id} className="task" data-cy={`task-${task.id}`}>
						<div className="top">
							<h1 data-cy={`task-${task.id}-title`} className="title">
								{task.title}
							</h1>
							<span className="date">{formatDate(task.createdAt)}</span>
							<span data-cy={`task-${task.id}-status`} className={`status ${task.status.toLowerCase()}`}>
								{statusMap[task.status]}
							</span>
						</div>

						<p data-cy={`task-${task.id}-description`} className="description">
							{task.description}
						</p>

						<div className="tags" data-cy={`task-${task.id}-tags`}>
							{task.tags.map((tag) => (
								<span className="tag" key={tag.id} style={{ backgroundColor: tagColors[tag.color] }}>
									{tag.name}
								</span>
							))}
						</div>
					</div>
				))}
		</StyledTaskContainer>
	);
};
