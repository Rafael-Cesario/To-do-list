import { StyledFilterSubject } from "../../styles/filter-subject-style";
import Image from "next/image";

export const FilterSubject = () => {
	return (
		<StyledFilterSubject>
			<input type="text" className="searchbar" placeholder="Pesquisar assunto, tag, data, vezes adicionadas" />

			<div className="filters">
				<button>Mostrar tags</button>

				<button>
					Filtrar por: <span className="current-filter">Mais vezes adicionadas</span>
					<Image className="icon" src="/icons/dropdown.png" width={20} height={20} alt="drop down menu icon" />
				</button>
			</div>
		</StyledFilterSubject>
	);
};
