"use client";
import { useState } from "react";
import { StyledCreateList } from "../styles/create-list-style";
import { ButtonLoading } from "@/components/button-loading";
import { useMutationsList } from "@/utils/hooks/use-mutations-list";
import { cookies } from "@/services/cookies";
import { IUserCookies } from "@/services/interfaces/cookies";
import { useDispatch } from "react-redux";
import { setNotification } from "@/context/slice-notification";
import { showError } from "@/utils/show-error";
import { errorsMap } from "@/services/errors-map";
import { addList, setActive } from "../context/list-slice";

export const CreateList = () => {
	const [createListContainer, setCreateListContainer] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [listName, setListName] = useState("");
	const [loading, setLoading] = useState(false);

	const { createListRequest } = useMutationsList();
	const dispatch = useDispatch();

	const createList = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!listName) return setHasError(true);

		setHasError(false);
		setLoading(true);

		try {
			const userCookies: IUserCookies = await cookies.get("user");
			const input = { userID: userCookies.userID, name: listName };

			const { data } = await createListRequest({ input });
			if (!data) throw new Error("Data is undefined");

			setListName("");
			dispatch(setNotification({ isOpen: true, type: "success", title: "Nova lista criada", message: "Sua nova lista foi criada com sucesso" }));
			dispatch(addList({ list: data.createList }));
			dispatch(setActive({ newActive: data.createList.listID }));
		} catch (error: any) {
			showError(error, dispatch, errorsMap.list);
		}

		setLoading(false);
	};

	return (
		<>
			<button onClick={() => setCreateListContainer(!createListContainer)} className="icon">
				+
			</button>

			{createListContainer && (
				<StyledCreateList>
					<div className="header">
						<h1 className="title">Criar nova lista</h1>

						<button onClick={() => setCreateListContainer(false)} className="close">
							x
						</button>
					</div>

					<form onSubmit={(e) => createList(e)}>
						<div className="field">
							<label htmlFor="list-name" className={hasError ? "error" : ""}>
								{hasError ? "Sua lista precisa de um nome" : "Nome"}
							</label>
							<input
								value={listName}
								autoFocus={true}
								type="text"
								placeholder="Minha nova lista"
								id="list-name"
								className={hasError ? "error" : ""}
								onChange={(e) => setListName(e.target.value)}
							/>
						</div>

						{loading || <button className="submit">Criar minha lista</button>}
						{loading && <ButtonLoading />}
					</form>
				</StyledCreateList>
			)}
		</>
	);
};
