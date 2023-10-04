import { useState } from "react";
import { LoadingButton } from "@/features/authentication/components/loading-button";
import { useMutation } from "@apollo/client";
import { taskQueries } from "@/services/queries/task";
import { IDeleteTask, ITask, RDeleteTask } from "@/services/interfaces/task";
import { StyledDeleteTask } from "./styles/styled-delete-task";
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";
import { useDispatch } from "react-redux";
import { setActive } from "@/features/home/context/task-slice";
import { setDeleteTask } from "@/features/home/context/list-slice";

export const DeleteTaskButton = ({ task }: { task: ITask }) => {
	const [showDelete, setShowDelete] = useState(false);
	const [deleteTaskMutation, { loading }] = useMutation<RDeleteTask, IDeleteTask>(taskQueries.DELETE_TASK);
	const dispatch = useDispatch();

	const deleteTask = async () => {
		try {
			await deleteTaskMutation({ variables: { deleteTaskData: { taskID: task.id } } });
			setShowDelete(false);
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Tarefa excluida", message: "Sua tarefa foi excluida com sucesso" } }));
			dispatch(setActive(null));
			dispatch(setDeleteTask({ listID: task.listID, taskID: task.id }));
		} catch (error: any) {
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
		}
	};

	if (loading) return <LoadingButton className="" />;

	return (
		<>
			<button onClick={() => setShowDelete(true)}>Excluir Tarefa</button>

			{showDelete && (
				<StyledDeleteTask autoFocus={true} className="confirm-delete">
					<p className="text">Quer mesmo excluir sua tarefa?</p>

					<button onClick={() => deleteTask()}>Sim</button>
					<button onClick={() => setShowDelete(false)}>Não</button>
				</StyledDeleteTask>
			)}
		</>
	);
};
