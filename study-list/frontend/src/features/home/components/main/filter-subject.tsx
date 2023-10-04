"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { StyledFilterSubject } from "../../styles/main/filter-subject-style";
import { TSortBy, setSortBy, setSubjectFilter } from "../../context/subject-slice";
import { useState } from "react";
import { Store } from "@/context/store";

const sortByMap = {
	decreasingAmount: "Mais vezes adicionadas",
	increasingAmount: "Menos vezes adicionadas",
	decreasingDate: "Data mais recente",
	increasingDate: "Data mais antiga",
};

export const FilterSubject = () => {
	const [searchValue, setSearchValue] = useState("");
	const [hasDropdown, setHasDropdown] = useState(false);
	const { sortBy } = useSelector((state: Store) => state.subject);

	const dispatch = useDispatch();

	const changeSortBy = (newSortBy: TSortBy) => {
		dispatch(setSortBy({ newSortBy }));
		setHasDropdown(false);
	};

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

			<div className="buttons">
				<button>Mostrar tags</button>

				<div className="dropdown">
					<button onClick={() => setHasDropdown(!hasDropdown)}>
						Ordenar por: <span className="sorted">{sortByMap[sortBy]}</span>
						<Image className="icon" src="/icons/dropdown.png" width={20} height={20} alt="drop down menu icon" />
					</button>

					{hasDropdown && (
						<div className="options">
							<button onClick={() => changeSortBy("decreasingAmount")} className={`sort ${sortBy === "decreasingAmount" && "active"}`} data-name="decreasingAmount">
								Mais vezes adicionadas
							</button>

							<button onClick={() => changeSortBy("increasingAmount")} className={`sort ${sortBy === "increasingAmount" && "active"}`} data-name="increasingAmount">
								Menos vezes adicionadas
							</button>

							<button onClick={() => changeSortBy("decreasingDate")} className={`sort ${sortBy === "decreasingDate" && "active"}`} data-name="decreasingDate">
								Data mais recente
							</button>

							<button onClick={() => changeSortBy("increasingDate")} className={`sort ${sortBy === "increasingDate" && "active"}`} data-name="increasingDate">
								Data mais antiga
							</button>
						</div>
					)}
				</div>
			</div>
		</StyledFilterSubject>
	);
};
