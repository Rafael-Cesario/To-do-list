"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { StyledFilterSubject } from "../../styles/filter-subject-style";
import { setSubjectFilter } from "../../context/subject-slice";
import { useState } from "react";

export const FilterSubject = () => {
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useDispatch();

	return (
		<StyledFilterSubject>
			<input
				type="text"
				className="searchbar"
				placeholder="Pesquisar assunto ou tag"
				role="search-subject"
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					dispatch(setSubjectFilter({ searchValue: e.target.value }));
				}}
			/>

			<div className="filters">
				<button>Mostrar tags</button>

				<div className="dropdown">
					<button>
						Filtrar por: <span className="current-filter">Mais vezes adicionadas</span>
						<Image className="icon" src="/icons/dropdown.png" width={20} height={20} alt="drop down menu icon" />
					</button>

					<div className="options">
						<button className="filter">Mais vezes adicionadas</button>
						<button className="filter">Menos vezes adicionadas</button>
						<button className="filter">Data mais recente</button>
						<button className="filter">Data mais antiga</button>
					</div>
				</div>
			</div>
		</StyledFilterSubject>
	);
};
