import { TaskInput } from "@/services/interfaces/task";
import { TaskStatus } from "./header/components/task-status";
import { TaskTag } from "./header/components/task-tag";
import { StyledTaskFields } from "./header/styles/styled-create-task";

interface Props {
	children: React.ReactNode;
	props: {
		containerTitle: string;
		titleRef: React.RefObject<HTMLInputElement>;
		task: TaskInput;
		error: string;
		setIsOpen: (state: boolean) => void;
		setTask: (state: TaskInput) => void;
	};
}

export const TaskFields = ({ props: { containerTitle, setIsOpen, titleRef, task, setTask, error }, children }: Props) => {
	return (
		<StyledTaskFields>
			<div className="container" data-cy="container-create-task">
				<button className="close" onClick={() => setIsOpen(false)}>
					x
				</button>

				<h1 className="title">{containerTitle}</h1>

				<div className="field-name">
					<label className="field-title" htmlFor="name">
						Titulo
					</label>
					<input ref={titleRef} type="text" id="name" placeholder="Tarefa para fazer" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} data-cy="input-title" />
					<span className="error">{error}</span>
				</div>

				<div className="field-description">
					<label className="field-title" htmlFor="description">
						Descrição ou anotações
					</label>

					<textarea
						name="description"
						id="description"
						placeholder="Links, notas, descrição..."
						value={task.description}
						onChange={(e) => setTask({ ...task, description: e.target.value })}
						data-cy="input-description"
					/>
				</div>

				<TaskStatus props={{ task, setTask }} />
				<TaskTag props={{ task, setTask }} />

				{children}
			</div>
		</StyledTaskFields>
	);
};
