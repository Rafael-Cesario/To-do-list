import { useDispatch, useSelector } from "react-redux";
import { StyledListOption } from "../../styles/sidebar/option-list-style";
import { Store } from "@/context/store";
import { useState } from "react";
import { showError } from "@/utils/show-error";
import { errorsMap } from "@/services/errors-map";
import { useMutationsList } from "@/utils/hooks/use-mutations-list";
import { setDeleteList } from "../../context/list-slice";
import { setNotification } from "@/context/slice-notification";
import { ButtonLoading } from "@/components/button-loading";
import { setOpenOptions } from "../../context/options-slice";

export const DeleteList = () => {
	const { active } = useSelector((state: Store) => state.list);
	const [listName, setListName] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { deleteListRequest } = useMutationsList();

	const deleteList = async () => {
		if (active.name.toLowerCase() !== listName.toLowerCase().trim()) return setError(true);

		setError(false);
		setLoading(true);

		try {
			await deleteListRequest({ input: { listID: active.listID } });
			dispatch(setDeleteList({ listID: active.listID }));
			dispatch(setNotification({ isOpen: true, type: "success", title: "Lista excluida", message: `Sua lista "${active.name}" foi excluida com sucesso.` }));
			dispatch(setOpenOptions({ isOpen: "" }));
		} catch (error: unknown) {
			showError(error, dispatch, errorsMap.list);
		}

		setLoading(false);
	};

	return (
		<StyledListOption type={"delete"}>
			<div className="container">
				<button onClick={() => dispatch(setOpenOptions({ isOpen: "" }))} className="close">
					x
				</button>

				<h1 className="title">Excluir lista</h1>
				<p className="description">Excluir sua lista irá também excluir todos seus assuntos adicionados a ela.</p>
				<p className="description">Digite o nome da lista atual para confirmar</p>
				<p className="description">Nome da sua lista: &#8220;{active.name}&#8220;</p>

				<input
					onKeyUp={(e) => e.key === "Enter" && deleteList()}
					autoFocus={true}
					className="list-name"
					type="text"
					placeholder={active?.name}
					onChange={(e) => setListName(e.target.value)}
					value={listName}
					role="delete-list-name"
				/>
				{error && <span className="error">Nome incorreto</span>}

				{loading || (
					<button className="submit" role="submit" onClick={() => deleteList()}>
						Excluir lista
					</button>
				)}

				{loading && <ButtonLoading />}
			</div>
		</StyledListOption>
	);
};

// Todo > Mutation
