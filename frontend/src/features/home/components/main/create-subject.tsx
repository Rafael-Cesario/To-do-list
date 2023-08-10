"use client";
import { useState } from "react";
import { StyledCreateSubject } from "../../styles/create-subject-style";
import { useMutationsSubject } from "@/utils/hooks/use-mutations-subject";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/context/store";
import { ButtonLoading } from "@/components/button-loading";
import { ISubject } from "@/services/interfaces/subjects";
import { setNewSubject, setUpdateSubject } from "../../context/subject-slice";

interface Feedback {
	type: "success" | "error" | "";
	message: string;
}

export const CreateSubject = () => {
	const [subjectName, setSubjectName] = useState("");
	const [feedback, setFeedback] = useState<Feedback>({ type: "", message: "" });
	const [loading, setLoading] = useState(false);
	const { active } = useSelector((state: Store) => state.list);
	const { subjects } = useSelector((state: Store) => state.subject);

	const { createSubjectRequest, updateSubjectRequest } = useMutationsSubject();
	const dispatch = useDispatch();

	const createSubject = async () => {
		if (!subjectName) return setFeedback({ type: "error", message: "Escolha um nome ou titulo antes de clicar em adicionar" });

		setLoading(true);

		const hasSubject = subjects.find((subject) => subject.name === subjectName);
		if (hasSubject) return increaseSubjectAmount(hasSubject);

		try {
			const { data } = await createSubjectRequest({ input: { listID: active.listID, name: subjectName.trim().toLowerCase() } });
			if (!data) throw new Error("Data is undefined");

			setSubjectName("");
			dispatch(setNewSubject({ newSubject: data.createSubject }));
			setFeedback({ type: "success", message: "Seu novo assunto foi adicionado" });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setFeedback({ type: "error", message: "Ops, um erro inesperado ocorreu, por favor recarregue a pagina e tente novamente" });
		}

		setLoading(false);
		setFeedback({ type: "", message: "" });
	};

	const increaseSubjectAmount = async (subject: ISubject) => {
		const { subjectID, name, notes, amount, tags } = subject;

		try {
			await updateSubjectRequest({ input: { subjectID, name, notes, amount: amount + 1, tags } });
			setSubjectName("");
			dispatch(setUpdateSubject({ subject: { ...subject, amount: amount + 1 } }));
			setFeedback({ type: "success", message: "Um assunto com o mesmo nome foi encontrado, e sua quantidade de vezes adicionada foi aumentada em 1" });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setFeedback({ type: "error", message: "Ops, um erro inesperado ocorreu, por favor recarregue a pagina e tente novamente" });
		}

		setLoading(false);
		setFeedback({ type: "", message: "" });
	};

	return (
		<StyledCreateSubject>
			{feedback.message && (
				<div className={feedback.type}>
					<span className="message">{feedback.message}</span>
					<button onClick={() => setFeedback({ type: "", message: "" })} className="close">
						x
					</button>
				</div>
			)}

			<div className="create">
				<input
					value={subjectName}
					onChange={(e) => setSubjectName(e.target.value)}
					onKeyUp={(e) => e.key === "Enter" && createSubject()}
					className="name"
					type="text"
					placeholder="Digite aqui seu novo assunto de estudos"
				/>

				{loading || (
					<button onClick={() => createSubject()} className="submit">
						Adicionar
					</button>
				)}

				{loading && <ButtonLoading />}
			</div>
		</StyledCreateSubject>
	);
};
