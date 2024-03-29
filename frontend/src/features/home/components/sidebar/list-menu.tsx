"use client";

import { Store } from "@/context/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledListMenu } from "./styles/styled-list-menu";
import { setActiveList, setDeleteList, setListMenu, setUpdateList } from "../../context/list-slice";
import { useMutation } from "@apollo/client";
import { listQueries } from "@/services/queries/list";
import { LoadingButton } from "@/features/authentication/components/loading-button";
import { IDeleteList, IUpdateList, RDeleteList, RUpdateList } from "@/services/interfaces/list";
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";

export const ListMenu = () => {
	const { active, isMenuOpen } = useSelector((state: Store) => state.list);
	const [listName, setListName] = useState("");
	const [error, setError] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);

	const dispatch = useDispatch();
	const [updateListMutation, { loading: saveListLoading }] = useMutation<RUpdateList, IUpdateList>(listQueries.UPDATE_LIST);
	const [deleteListMutation, { loading: deleteListLoading }] = useMutation<RDeleteList, IDeleteList>(listQueries.DELETE_LIST);

	if (!isMenuOpen || !active) return null;

	const saveList = async () => {
		if (!listName) return setError("Sua lista precisa de um nome");
		setError("");

		try {
			const variables: IUpdateList = { updateListData: { listID: active.id, newName: listName } };
			const { data } = await updateListMutation({ variables });
			if (!data) throw new Error("Data is undefined");

			setListName("");
			dispatch(setUpdateList({ newList: data.updateList }));
			dispatch(setActiveList({ newActive: data.updateList }));
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Lista salva", message: "Sua lista foi salva com sucesso." } }));
		} catch (error: any) {
			const [errorCode] = error.message.split(":");
			const message = messageErrors.list[errorCode as keyof typeof messageErrors.list];
			if (!message) return dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
			setError(message);
		}
	};

	const deleteList = async () => {
		try {
			const variables: IDeleteList = { deleteListData: { listID: active.id } };
			await deleteListMutation({ variables });
			setConfirmDelete(false);
			dispatch(setDeleteList({ listID: active.id }));
			dispatch(setActiveList({ newActive: null }));
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Lista removida", message: "Sua lista foi excluida com sucesso." } }));
			dispatch(setListMenu({ isOpen: false }));
		} catch (error: any) {
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: messageErrors.default } }));
		}
	};

	return (
		<StyledListMenu>
			<div className="container">
				<button className="close" data-cy="close-list-menu" onClick={() => dispatch(setListMenu({ isOpen: false }))}>
					x
				</button>

				<h1 className="title">{active.name}</h1>

				<div className="data">
					<label htmlFor="name">Nome</label>
					<input autoFocus={true} placeholder={active.name} type="text" id="name" value={listName} onChange={(e) => setListName(e.target.value)} />
					<span className="error" data-cy="error">
						{error}
					</span>
				</div>

				<div className="buttons">
					{saveListLoading || (
						<button data-cy="save" className="save" onClick={() => saveList()}>
							Salvar alterações
						</button>
					)}

					{saveListLoading && <LoadingButton className="save" />}

					{deleteListLoading || (
						<button data-cy="delete" className="delete" onClick={() => setConfirmDelete(!confirmDelete)}>
							Excluir lista
						</button>
					)}

					{deleteListLoading && <LoadingButton className="delete" />}
				</div>

				{confirmDelete && (
					<div className="delete-list">
						<p className="text">Quer mesmo remover sua lista?</p>

						<div className="buttons">
							<button data-cy="confirm-delete" onClick={() => deleteList()}>
								Sim
							</button>
							<button onClick={() => setConfirmDelete(false)}>Não</button>
						</div>
					</div>
				)}
			</div>
		</StyledListMenu>
	);
};
