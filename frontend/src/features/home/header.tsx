import { Menu } from "./components/menu";
import { StyledHeader } from "./styles/header-style";

export const Header = () => {
	return (
		<StyledHeader>
			<div className="title">
				<h1>ListName</h1>
				<p>12 Itens na lista</p>
			</div>

			<div className="menu">
				<Menu />
				<input type="text" placeholder="Pesquisar assunto, tag, data..." />
			</div>
		</StyledHeader>
	);
};
