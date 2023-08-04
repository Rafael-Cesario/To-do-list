"use client";
import { useSelector } from "react-redux";
import { StyledListOption } from "../styles/rename-list-style";
import { Store } from "@/context/store";

interface Props {
	props: {
		// eslint-disable-next-line no-unused-vars
		setRenameListContainer: (isOpen: boolean) => void;
	};
}

export const RenameList = ({ props: { setRenameListContainer } }: Props) => {
	const { active } = useSelector((state: Store) => state.list);

	return (
		<StyledListOption type={"rename"}>
			<div className="container">
				<button onClick={() => setRenameListContainer(false)} className="close">
					x
				</button>

				<h1 className="title">Renomear lista</h1>
				<p className="description">Altere o nome da lista e clique no botão para salvar.</p>

				<input className="list-name" type="text" placeholder={active?.name} />
				<button className="submit">Salvar alterações</button>
			</div>
		</StyledListOption>
	);
};

// Todo > Mutation
