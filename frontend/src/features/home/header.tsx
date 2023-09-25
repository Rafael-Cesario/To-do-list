import { StyledHeader } from "./styles/styled-header";

export const Header = () => {
	return (
		<StyledHeader>
			<div className="active">
				<h1 className="title">ListName</h1>
				<span className="tasks-length">20 itens na lista</span>
			</div>

			<div className="right">
				<input className="search-task" type="text" placeholder="Buscar tarefa, tag, ou data" />
				<button className="configs">Configurações</button>
				<button className="create-task">Adicionar tarefa</button>
			</div>
		</StyledHeader>
	);
};
