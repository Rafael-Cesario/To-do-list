"use client";
import { useState } from "react";
import { StyledDelete } from "./style/delete-style";
import { ISubject } from "@/services/interfaces/subjects";
import { useMutationsSubject } from "@/utils/hooks/use-mutations-subject";
import { useDispatch } from "react-redux";
import { setNotification } from "@/context/slice-notification";
import { setActive, setDeleteSubject } from "../../context/subject-slice";

interface Props {
	subject: ISubject;
}

export const Delete = ({ subject }: Props) => {
	const [deleteContainer, setDeleteContainer] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { deleteSubjectRequest } = useMutationsSubject();

	const deleteSubject = async () => {
		setLoading(true);

		await deleteSubjectRequest({ subjectID: subject.subjectID });

		setLoading(false);
		setDeleteContainer(false);
		dispatch(setNotification({ isOpen: true, type: "success", title: "Assunto removido", message: "Seu assunto de estudo foi removido com sucesso." }));
		dispatch(setDeleteSubject({ subjectID: subject.subjectID }));
		dispatch(setActive({ subject: null }));
	};

	return (
		<StyledDelete>
			<button onClick={() => setDeleteContainer(true)} className="delete">
				Excluir assunto
			</button>

			{deleteContainer && (
				<div className="container-delete-subject">
					<div className="confirmation">
						<h1 className="title">{subject.name}</h1>
						<p>Quer mesmo excluir este assunto?</p>

						<div className="options">
							<button onClick={() => deleteSubject()}>Sim</button>
							<button onClick={() => setDeleteContainer(false)}>Não</button>
						</div>
					</div>
				</div>
			)}
		</StyledDelete>
	);
};
