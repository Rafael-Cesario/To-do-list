"use client";
import { useSelector } from "react-redux";
import { StyledHeader } from "./styles/styled-header";
import { Store } from "@/context/store";

export const Header = () => {
	const { active } = useSelector((state: Store) => state.list);

	if (!active) return null;

	return (
		<StyledHeader>
			<div className="active">
				<h1 className="title">{active.name}</h1>
				<span className="tasks-length">{active.tasks?.length ?? 0} itens na lista</span>
			</div>

			<div className="right">
				<input className="search-task" type="text" placeholder="Buscar tarefa, tag, ou data" />
				<button className="configs">Configurações</button>
				<button className="create-task">Adicionar tarefa</button>
			</div>
		</StyledHeader>
	);
};
