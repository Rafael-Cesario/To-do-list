import { useState } from "react";
import { StyledCreateTask } from "./styles/styled-create-task";
import { Status } from "@/services/interfaces/task";
import { TaskStatus } from "./components/task-status";
import { TaskTag } from "./components/task-tag";

export interface ITagColors {
	gray: "#222222";
	red: "#973E3E";
	brown: "#5B3124";
	orange: "#B54F2F";
	yellow: "#D8AE1C";
	green: "#3D7921";
	lightBlue: "#1060CC";
	darkBlue: "#213479";
	purple: "#481F72";
	pink: "#B024A2";
}

export interface ITaskValues {
	title: string;
	description: string;
	status: Status;
	tags: { name: string; color: keyof ITagColors }[];
}

const defaultTaskValues: ITaskValues = {
	title: "",
	description: "",
	status: Status.NEXT,
	tags: [],
};

export const CreateTask = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [task, setTask] = useState(defaultTaskValues);

	const submitTask = () => {
		console.log({ task });
	};

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="create-task">
				Adicionar tarefa
			</button>

			{isOpen && (
				<StyledCreateTask>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1 className="title">Nova Tarefa</h1>

						<div className="field-name">
							<label className="field-title" htmlFor="name">
								Titulo
							</label>
							<input type="text" id="name" placeholder="Tarefa para fazer" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
							<span className="error">Sua tarefa precisa de um titulo</span>
						</div>

						<div className="field-description">
							<label className="field-title" htmlFor="description">
								Descrição ou anotações
							</label>

							<textarea name="description" id="description" placeholder="Links, notas, descrição..." value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
						</div>

						<TaskStatus props={{ task, setTask }} />
						<TaskTag props={{ task, setTask }} />

						<button className="submit-task" onClick={() => submitTask()}>
							Criar
						</button>
					</div>
				</StyledCreateTask>
			)}
		</>
	);
};
