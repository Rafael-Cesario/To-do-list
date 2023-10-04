"use client";
import { useDispatch, useSelector } from "react-redux";
import { TaskFields } from "../task-fields";
import { Store } from "@/context/store";
import { useRef, useState, useEffect } from "react";
import { setActive } from "../../context/task-slice";
import { IUpdateTask, RUpdateTask, TaskInput } from "@/services/interfaces/task";
import { defaultTaskValues } from "../header/create-task";
import { useMutation } from "@apollo/client";
import { taskQueries } from "@/services/queries/task";

export const TaskDetails = () => {
	const { activeTask } = useSelector((state: Store) => state.task);
	const [task, setTask] = useState<TaskInput>(defaultTaskValues);
	const [error, setError] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();
	const setIsOpen = () => dispatch(setActive(null));
	const [updateTaskMutation, { loading }] = useMutation<RUpdateTask, IUpdateTask>(taskQueries.UPDATE_TASK);

	useEffect(() => {
		if (activeTask) {
			const { title, description, status, tags } = activeTask;
			setTask({ title, description, status, tags });
		}

		setError("");
	}, [activeTask]);

	if (!activeTask) return null;

	const showError = (error: string) => {
		titleRef.current?.focus();
		setError(error);
	};

	const saveChanges = async () => {
		console.log(task, activeTask);

		if (!task.title) return showError("Sua tarefa precisa de um titulo.");
		if (task.title.length > 100) return showError("Seu titulo não deve exceder 100 caracteres");
		setError("");

		try {
			const tags = task.tags.map(({ name, color }) => ({ name, color }));
			const variables: IUpdateTask = { updateTaskData: { ...task, tags, taskID: activeTask.id } };
			const { data } = await updateTaskMutation({ variables });
			console.log({ data });
		} catch (error: any) {
			console.log({ error });
		}

		// todo >
		// mutation
		// catch errors
		// update state
		// notification
		// close active task
		// tests
	};

	return (
		<TaskFields props={{ containerTitle: activeTask.title, error, setIsOpen, setTask, task, titleRef }}>
			<div className="buttons">
				<button onClick={() => saveChanges()}>Salvar Alterações</button>
				<button>Excluir Tarefa</button>
			</div>
		</TaskFields>
	);
};
