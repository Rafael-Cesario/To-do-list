import { CreateSubject } from "./components/main/create-subject";
import { FilterSubject } from "./components/main/filter-subject";
import { LoaderSubject } from "./components/main/loader-subject";
import { LoaderTags } from "./components/main/loader-tags";
import { SubjectsContainer } from "./components/main/subjects-container";
import { StyledMain } from "./styles/main/main-style";
import { SubjectArea } from "./subject-area";

export const Main = () => {
	return (
		<StyledMain>
			<LoaderSubject />
			<LoaderTags />
			<CreateSubject />
			<FilterSubject />
			<SubjectsContainer />
			<SubjectArea />
		</StyledMain>
	);
};
