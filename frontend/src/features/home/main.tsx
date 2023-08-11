"use client";
import { CreateSubject } from "./components/main/create-subject";
import { FilterSubject } from "./components/main/filter-subject";
import { LoaderSubject } from "./components/main/loader-subject";
import { SubjectsContainer } from "./components/main/subjects-container";
import { StyledMain } from "./styles/main/main-style";

export const Main = () => {
	return (
		<StyledMain>
			<LoaderSubject />
			<CreateSubject />
			<FilterSubject />
			<SubjectsContainer />
		</StyledMain>
	);
};
