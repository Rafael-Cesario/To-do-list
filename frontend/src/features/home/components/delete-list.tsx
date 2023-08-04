import { useSelector } from "react-redux";
import { StyledListOption } from "../styles/rename-list-style";
import { Store } from "@/context/store";

interface Props {
	props: {
		// eslint-disable-next-line no-unused-vars
		setDeleteListContainer: (isOpen: boolean) => void;
	};
}

export const DeleteList = ({ props: { setDeleteListContainer } }: Props) => {
	const { active } = useSelector((state: Store) => state.list);

	return (
		<StyledListOption type={"delete"}>
			<div className="container">
				<button onClick={() => setDeleteListContainer(false)} className="close">
					x
				</button>

				<h1 className="title">Excluir lista</h1>
				<p className="description">Excluir sua lista irá também excluir todos seus assuntos adicionados a ela.</p>
				<p className="description">Digite o nome da lista atual para confirmar</p>

				<input className="list-name" type="text" placeholder={active?.name} />
				<button className="submit">Salvar alterações</button>
			</div>
		</StyledListOption>
	);
};

// Todo > Mutation