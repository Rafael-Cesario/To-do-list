"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { StyledFilterSubject } from "../../styles/filter-subject-style";
import { setSubjectFilter } from "../../context/subject-slice";

export const FilterSubject = () => {
	const dispatch = useDispatch();

	return (
		<StyledFilterSubject>
			<input onChange={(e) => dispatch(setSubjectFilter({ searchValue: e.target.value }))} type="text" className="searchbar" placeholder="Pesquisar assunto ou tag" />

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
