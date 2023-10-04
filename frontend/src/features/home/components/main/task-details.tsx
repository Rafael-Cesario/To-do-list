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
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";
import { setUpdateTask } from "../../context/list-slice";
import { LoadingButton } from "@/features/authentication/components/loading-button";

export const TaskDetails = () => {
	const { activeTask } = useSelector((state: Store) => state.task);
	const [task, setTask] = useState<TaskInput>(defaultTaskValues);
	const [error, setError] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();
	const setIsOpen = () => dispatch(setActive(null));
	const [updateTaskMutation, { loading: loadingUpdateTask }] = useMutation<RUpdateTask, IUpdateTask>(taskQueries.UPDATE_TASK);

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

	// todo > tests
	const saveChanges = async () => {
		if (!task.title) return showError("Sua tarefa precisa de um titulo.");
		if (task.title.length > 100) return showError("Seu titulo não deve exceder 100 caracteres");
		setError("");

		try {
			const tags = task.tags.map(({ name, color }) => ({ name, color }));
			const variables: IUpdateTask = { updateTaskData: { ...task, tags, taskID: activeTask.id } };
			const { data } = await updateTaskMutation({ variables });
			if (!data) throw new Error("Data is undefined");

			dispatch(setActive(null));
			dispatch(setUpdateTask({ listID: activeTask.listID, newTask: data.updateTask }));
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Tarefa salva", message: "Sua tarefa foi salva com sucesso" } }));
		} catch (error: any) {
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
		}
	};

	return (
		<TaskFields props={{ containerTitle: activeTask.title, error, setIsOpen, setTask, task, titleRef }}>
			<div className="buttons">
				<SaveChangesButton loading={loadingUpdateTask} saveChanges={saveChanges} />
				<button>Excluir Tarefa</button>
			</div>
		</TaskFields>
	);
};

const SaveChangesButton = ({ loading, saveChanges }: { loading: boolean; saveChanges: () => void }) => {
	if (loading) return <LoadingButton className="" />;
	return <button onClick={() => saveChanges()}>Salvar Alterações</button>;
};
