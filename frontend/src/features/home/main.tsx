import { CreateSubject } from "./components/create-subject";
import { LoaderSubject } from "./components/loader-subject";

export const Main = () => {
	return (
		<main>
			<LoaderSubject />
			<CreateSubject />
		</main>
	);
};
