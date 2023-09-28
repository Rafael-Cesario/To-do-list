import { Status } from "@/services/interfaces/task";
import { produce } from "immer";
import { defaultTaskValues } from "../create-task";

interface Props {
	props: {
		text: string;
		status: Status;
		taskStatus: Status;
		className: "next" | "current" | "done";
		task: typeof defaultTaskValues;
		setTask: (state: typeof defaultTaskValues) => void;
	};
}

export const TaskStatus = ({ props: { text, status, className, taskStatus, task, setTask } }: Props) => {
	if (taskStatus === status) className += " active";

	const updateTaskStatus = (status: Status) => {
		const state = produce(task, (draft) => {
			draft.status = status;
		});

		setTask(state);
	};

	return (
		<button onClick={() => updateTaskStatus(status)} className={className}>
			{text}
		</button>
	);
};
