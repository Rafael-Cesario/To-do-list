"use client";
import { useState } from "react";
import { StyledCreateList } from "../styles/create-list-style";
import { ButtonLoading } from "@/components/button-loading";
import { useMutationsList } from "@/utils/hooks/use-mutations-list";
import { cookies } from "@/services/cookies";

export const CreateList = () => {
	const [createListContainer, setCreateListContainer] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [listName, setListName] = useState("");
	const [loading, setLoading] = useState(false);
	const { createListRequest } = useMutationsList();

	const createList = async () => {
		if (!listName) return setHasError(true);
		setHasError(false);

		setLoading(true);

		const userCookies = await cookies.get("user");
		console.log({ userCookies });

		// send request
		// send success notification
		// catch errors

		// try {
		// 	const input = { userID: "", name: "" };
		// 	const response = await createListRequest({ input });
		// 	console.log({ response });
		// } catch (error: any) {
		// 	console.log({ error });
		// }

		setTimeout(() => {
			setLoading(false);
		}, 1000);
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

					<form
						onSubmit={(e) => {
							e.preventDefault();
							createList();
						}}>
						<div className="field">
							<label htmlFor="list-name" className={hasError ? "error" : ""}>
								{hasError ? "Sua lista precisa de um nome" : "Nome"}
							</label>
							<input
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
