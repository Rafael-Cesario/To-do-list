import { Store } from "@/context/store";
import { useState } from "react";
import { StyledCreateTask } from "./styles/styled-create-task";
import { ICreateTask, RCreateTask, Status } from "@/services/interfaces/task";
import { TaskStatus } from "./components/task-status";
import { TaskTag } from "./components/task-tag";
import { ITaskValues } from "./interfaces/task";
import { useMutation } from "@apollo/client";
import { taskQueries } from "@/services/queries/task";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@/features/authentication/components/loading-button";
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";
import { setCreateTask } from "../../context/list-slice";

const defaultTaskValues: ITaskValues = {
	title: "",
	description: "",
	status: Status.NEXT,
	tags: [],
};

export const CreateTask = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [task, setTask] = useState(defaultTaskValues);
	const [error, setError] = useState("");
	const { active } = useSelector((state: Store) => state.list);

	const [createTaskMutation, { loading }] = useMutation<RCreateTask, ICreateTask>(taskQueries.CREATE_TASK);
	const dispatch = useDispatch();

	if (!active) return;

	const submitTask = async () => {
		if (!task.title) return setError("Sua tarefa precisa de um titulo.");
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
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
		}
	};

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="create-task">
				Adicionar tarefa
			</button>

			{isOpen && (
				<StyledCreateTask>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1 className="title">Nova Tarefa</h1>

						<div className="field-name">
							<label className="field-title" htmlFor="name">
								Titulo
							</label>
							<input type="text" id="name" placeholder="Tarefa para fazer" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
							<span className="error">{error}</span>
						</div>

						<div className="field-description">
							<label className="field-title" htmlFor="description">
								Descrição ou anotações
							</label>

							<textarea name="description" id="description" placeholder="Links, notas, descrição..." value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
						</div>

						<TaskStatus props={{ task, setTask }} />
						<TaskTag props={{ task, setTask }} />

						<ButtonCreateTask loading={loading} submitTask={submitTask} />
					</div>
				</StyledCreateTask>
			)}
		</>
	);
};

const ButtonCreateTask = ({ loading, submitTask }: { loading: boolean; submitTask: () => void }) => {
	if (loading) return <LoadingButton className="submit-task" />;

	return (
		<button className="submit-task" onClick={() => submitTask()}>
			Criar
		</button>
	);
};
