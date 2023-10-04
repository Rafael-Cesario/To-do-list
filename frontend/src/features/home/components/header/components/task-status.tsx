import { TaskInput, Status } from "@/services/interfaces/task";
import { StyledTaskStatus } from "./styles/styled-task-status";

interface Props {
	props: {
		task: TaskInput;
		setTask: (state: TaskInput) => void;
	};
}

export const TaskStatus = ({ props: { task, setTask } }: Props) => {
	return (
		<StyledTaskStatus>
			<h1 className="field-title">Status</h1>

			<div className="status">
				<button data-cy="status" onClick={() => setTask({ ...task, status: Status.NEXT })} className={`next ${task.status === Status.NEXT ? "active" : ""}`}>
					Próximas
				</button>

				<button data-cy="status" onClick={() => setTask({ ...task, status: Status.CURRENT })} className={`current ${task.status === Status.CURRENT ? "active" : ""}`}>
					Em Progresso
				</button>

				<button data-cy="status" onClick={() => setTask({ ...task, status: Status.DONE })} className={`done ${task.status === Status.DONE ? "active" : ""}`}>
					Concluídas
				</button>
			</div>
		</StyledTaskStatus>
	);
};
