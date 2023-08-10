import { CreateSubject } from "./components/main/create-subject";
import { LoaderSubject } from "./components/main/loader-subject";
import { SubjectsContainer } from "./components/main/subjects-container";

export const Main = () => {
	return (
		<main>
			<LoaderSubject />
			<CreateSubject />
			<SubjectsContainer />
		</main>
	);
};
