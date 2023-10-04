import { Store } from "@/context/store";
import { useRef, useState } from "react";
import { ICreateTask, TaskInput, RCreateTask, Status } from "@/services/interfaces/task";
import { useMutation } from "@apollo/client";
import { taskQueries } from "@/services/queries/task";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@/features/authentication/components/loading-button";
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";
import { setCreateTask } from "../../context/list-slice";
import { TaskFields } from "../task-fields";

export const defaultTaskValues: TaskInput = {
	title: "",
	description: "",
	status: Status.NEXT,
	tags: [],
};

export const CreateTask = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [task, setTask] = useState(defaultTaskValues);
	const [error, setError] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);
	const { active } = useSelector((state: Store) => state.list);

	const [createTaskMutation, { loading }] = useMutation<RCreateTask, ICreateTask>(taskQueries.CREATE_TASK);
	const dispatch = useDispatch();

	if (!active) return;

	const submitTask = async () => {
		if (!task.title) {
			titleRef.current?.focus();
			return setError("Sua tarefa precisa de um titulo.");
		}

		if (task.title.length > 100) {
			titleRef.current?.focus();
			return setError("Seu titulo não deve exceder 100 caracteres");
		}

		setError("");

		try {
			const variables: ICreateTask = { createTaskData: { ...task, listID: active.id } };
			const { data } = await createTaskMutation({ variables });
			if (!data) throw new Error("Data is undefined");

			setTask(defaultTaskValues);
			setIsOpen(false);

			dispatch(setCreateTask({ newTask: data.createTask }));
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Nova Tarefa", message: "Sua nova tarefa foi adicionada com sucesso" } }));
		} catch (error: any) {
			console.log({ error });
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
		}
	};

	return (
		<>
			<button data-cy="open-create-task" onClick={() => setIsOpen(true)} className="create-task">
				Adicionar tarefa
			</button>

			{isOpen && (
				<TaskFields props={{ containerTitle: "Nova Lista", error, setIsOpen, setTask, task, titleRef }}>
					<ButtonCreateTask loading={loading} submitTask={submitTask} />
				</TaskFields>
			)}
		</>
	);
};

const ButtonCreateTask = ({ loading, submitTask }: { loading: boolean; submitTask: () => void }) => {
	if (loading) return <LoadingButton className="submit-task" />;

	return (
		<button data-cy="submit-task" className="submit-task" onClick={() => submitTask()}>
			Criar
		</button>
	);
};
