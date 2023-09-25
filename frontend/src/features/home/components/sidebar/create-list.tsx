"use client";

import { useState } from "react";
import { StyledCreateList } from "./styles/styled-create-list";
import { useMutation } from "@apollo/client";
import { listQueries } from "@/services/queries/list";
import { ICreateList, RCreateList } from "@/services/interfaces/list";
import { messageErrors } from "@/services/interfaces/errors";
import { useDispatch } from "react-redux";
import { setNotification } from "@/context/notification-slice";
import { setAddList } from "../../context/list-slice";

interface Props {
	userID: string;
}

export const CreateList = ({ userID }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [listName, setListName] = useState("");
	const [error, setError] = useState("");

	const [createListMutation, { loading }] = useMutation<RCreateList, ICreateList>(listQueries.CREATE_LIST);
	const dispatch = useDispatch();

	const createList = async () => {
		if (!listName) return setError("Sua lista precisa de um nome");
		setError("");

		try {
			const variables: ICreateList = { createListData: { name: listName, userID } };
			const { data } = await createListMutation({ variables });
			if (!data) throw new Error("Data is undefined");

			dispatch(setAddList({ newList: { ...data.createList, tasks: [] } }));
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Nova lista", message: `Sua lista " ${listName} " foi criada com sucesso` } }));

			setListName("");
			setIsOpen(false);
		} catch (error: any) {
			const [errorCode] = error.message.split(":");
			const message = messageErrors.list[errorCode as keyof typeof messageErrors.list];
			if (!message) return dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Error", message: messageErrors.default } }));
			setError(message);
		}
	};

	return (
		<>
			<button className="create-list" onClick={() => setIsOpen(true)}>
				Criar nova lista
			</button>

			{isOpen && (
				<StyledCreateList>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1>Criar Lista</h1>

						<div className="field">
							<label htmlFor="name">Nome</label>
							<input value={listName} onChange={(e) => setListName(e.target.value)} autoFocus={true} type="text" id="name" placeholder="Digite um nome para sua lista" />
							<span className="error">{error}</span>
						</div>

						<button className="submit" onClick={() => createList()}>
							Criar
						</button>
					</div>
				</StyledCreateList>
			)}
		</>
	);
};
