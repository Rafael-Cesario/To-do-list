import { useState } from "react";
import { StyledCreateTask } from "./styles/styled-create-task";
import { Status } from "@/services/interfaces/task";
import { produce } from "immer";
import { TaskStatus } from "./components/task-status";

type FieldName = "title" | "description";

export const defaultTaskValues = {
	title: "",
	description: "",
	status: Status.NEXT,
	tags: [],
};

export const CreateTask = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [task, setTask] = useState(defaultTaskValues);

	const tagColors = {
		gray: "#222222",
		red: "#973E3E",
		brown: "#5B3124",
		orange: "#B54F2F",
		yellow: "#D8AE1C",
		green: "#3D7921",
		lightBlue: "#1060CC",
		darkBlue: "#213479",
		purple: "#481F72",
		pink: "#B024A2",
	};

	const updateFieldValue = (fieldName: FieldName, newValue: string) => {
		const state = produce(task, (draft) => {
			draft[fieldName] = newValue;
		});

		setTask(state);
	};

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
							<input type="text" id="name" placeholder="Tarefa para fazer" value={task.title} onChange={(e) => updateFieldValue("title", e.target.value)} />
							<span className="error">Sua tarefa precisa de um titulo</span>
						</div>

						<div className="field-description">
							<label className="field-title" htmlFor="description">
								Descrição ou anotações
							</label>

							<textarea name="description" id="description" placeholder="Links, notas, descrição..." value={task.description} onChange={(e) => updateFieldValue("description", e.target.value)} />
						</div>

						<div className="field-status">
							<h2 className="field-title">Status</h2>

							<div className="status">
								<TaskStatus props={{ text: "Próximas", className: "next", task, setTask, status: Status.NEXT, taskStatus: task.status }} />
								<TaskStatus props={{ text: "Em Progresso", className: "current", task, setTask, status: Status.CURRENT, taskStatus: task.status }} />
								<TaskStatus props={{ text: "Concluídas", className: "done", task, setTask, status: Status.DONE, taskStatus: task.status }} />
							</div>
						</div>

						<div className="field-tag">
							<h2 className="field-title">Tags</h2>

							<div className="colors">
								{Object.entries(tagColors).map(([name, color]) => (
									<button className="color" key={name} style={{ backgroundColor: color }} name={name} />
								))}
							</div>

							<div>
								<input type="text" className="tag-name" placeholder="Nova tag" />
								<button className="tag-create">+</button>
							</div>

							<div className="tag-container">
								<div className="tag" style={{ backgroundColor: tagColors.red }}>
									<span>Importante</span>
									<button className="remove-tag">x</button>
								</div>
							</div>
						</div>

						<button className="submit-task" onClick={() => submitTask()}>
							Criar
						</button>
					</div>
				</StyledCreateTask>
			)}
		</>
	);
};
