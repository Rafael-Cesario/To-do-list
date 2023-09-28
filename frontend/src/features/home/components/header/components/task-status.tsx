import { Status } from "@/services/interfaces/task";
import { ITaskValues } from "../create-task";
import { StyledTaskStatus } from "./styles/styled-task-status";

interface Props {
	props: {
		task: ITaskValues;
		setTask: (state: ITaskValues) => void;
	};
}

export const TaskStatus = ({ props: { task, setTask } }: Props) => {
	return (
		<StyledTaskStatus>
			<h1 className="field-title">Status</h1>

			<div className="status">
				<button onClick={() => setTask({ ...task, status: Status.NEXT })} className={`next ${task.status === Status.NEXT ? "active" : ""}`}>
					Próximas
				</button>

				<button onClick={() => setTask({ ...task, status: Status.CURRENT })} className={`current ${task.status === Status.CURRENT ? "active" : ""}`}>
					Em Progresso
				</button>

				<button onClick={() => setTask({ ...task, status: Status.DONE })} className={`done ${task.status === Status.DONE ? "active" : ""}`}>
					Concluídas
				</button>
			</div>
		</StyledTaskStatus>
	);
};
