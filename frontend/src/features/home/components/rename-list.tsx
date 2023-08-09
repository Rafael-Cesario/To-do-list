"use client";
import { setNotification } from "@/context/slice-notification";
import { Store } from "@/context/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledListOption } from "../styles/option-list-style";
import { showError } from "@/utils/show-error";
import { errorsMap } from "@/services/errors-map";
import { useMutationsList } from "@/utils/hooks/use-mutations-list";
import { setRenameList } from "../context/list-slice";
import { ButtonLoading } from "@/components/button-loading";
import { setOpenOptions } from "../context/options-slice";

export const RenameList = () => {
	const { active, lists } = useSelector((state: Store) => state.list);
	const [listName, setListName] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { renameListRequest } = useMutationsList();

	const renameList = async () => {
		if (!listName) {
			return dispatch(setNotification({ isOpen: true, type: "error", title: "Lista sem nome", message: "Sua lista precisa de um nome" }));
		}

		const nameAlreadyUsed = lists.find((list) => list.name === listName.toLowerCase());

		if (nameAlreadyUsed) {
			return dispatch(
				setNotification({
					isOpen: true,
					type: "error",
					title: "Nome duplicado",
					message: "Uma lista com o mesmo nome já existe, duas listas não podem ter nomes iguais",
				})
			);
		}

		setLoading(true);

		try {
			const input = { userID: active.userID, listID: active.listID, newName: listName };
			const { data } = await renameListRequest({ input });
			if (!data) throw new Error("Data is undefined");

			dispatch(
				setNotification({
					isOpen: true,
					type: "success",
					title: "Lista renomeada",
					message: `"${active.name}" foi renomedada para "${listName}"`,
				})
			);

			dispatch(setRenameList({ list: data.renameList }));
			dispatch(setOpenOptions({ isOpen: "" }));

			// todo
			// setOptionsIsOpen(false);
		} catch (error: unknown) {
			showError(error, dispatch, errorsMap.list);
		}

		setLoading(false);
	};

	return (
		<StyledListOption type={"rename"}>
			<div className="container">
				<button onClick={() => dispatch(setOpenOptions({ isOpen: "" }))} className="close">
					x
				</button>

				<h1 className="title">Renomear lista</h1>
				<p className="description">Altere o nome da lista e clique no botão para salvar.</p>

				<input
					onKeyUp={(e) => e.key === "Enter" && renameList()}
					autoFocus={true}
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					className="list-name"
					type="text"
					placeholder={active?.name}
				/>

				{loading || (
					<button className="submit" onClick={() => renameList()}>
						Salvar alterações
					</button>
				)}

				{loading && <ButtonLoading />}
			</div>
		</StyledListOption>
	);
};
