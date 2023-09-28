import { Status } from "@/services/interfaces/task";
import { ITaskValues } from "../create-task";

interface Props {
	props: {
		text: string;
		status: Status;
		taskStatus: Status;
		className: "next" | "current" | "done";
		task: ITaskValues;
		setTask: (state: ITaskValues) => void;
	};
}

export const TaskStatus = ({ props: { text, status, className, taskStatus, task, setTask } }: Props) => {
	if (taskStatus === status) className += " active";

	return (
		<button onClick={() => setTask({ ...task, status: status })} className={className}>
			{text}
		</button>
	);
};
