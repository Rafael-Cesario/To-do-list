"use client";
import { useDispatch, useSelector } from "react-redux";
import { TaskFields } from "../task-fields";
import { Store } from "@/context/store";
import { useRef, useState, useEffect } from "react";
import { setActive } from "../../context/task-slice";
import { TaskInput } from "@/services/interfaces/task";
import { defaultTaskValues } from "../header/create-task";

export const TaskDetails = () => {
	const { activeTask } = useSelector((state: Store) => state.task);
	const [task, setTask] = useState<TaskInput>(defaultTaskValues);
	const [error, setError] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();
	const setIsOpen = () => dispatch(setActive(null));

	useEffect(() => {
		if (activeTask) {
			const { title, description, status, tags } = activeTask;
			setTask({ title, description, status, tags });
		}
	}, [activeTask]);

	const saveChanges = () => {
		// todo >
		// interface input and response
		// mutation
		// catch errors
		// update state
		// notification
		// close active task
		// tests

		console.log(task, activeTask);
	};

	if (!activeTask) return null;

	return (
		<TaskFields props={{ containerTitle: activeTask.title, error, setIsOpen, setTask, task, titleRef }}>
			<div className="buttons">
				<button onClick={() => saveChanges()}>Salvar Alterações</button>
				<button>Excluir Tarefa</button>
			</div>
		</TaskFields>
	);
};
