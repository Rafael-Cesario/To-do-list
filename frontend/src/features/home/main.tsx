import { CreateSubject } from "./components/create-subject";
import { LoaderSubject } from "./components/loader-subject";
import { SubjectsContainer } from "./components/subjects-container";

export const Main = () => {
	return (
		<main>
			<LoaderSubject />
			<CreateSubject />
			<SubjectsContainer />
		</main>
	);
};
