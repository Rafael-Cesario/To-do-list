import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/lib/all-providers";
import { render, screen } from "@testing-library/react";
import { ISubject } from "@/services/interfaces/subjects";
import { SubjectsContainer } from "../components/main/subjects-container";
import { FilterSubject } from "../components/main/filter-subject";
import { store } from "@/context/store";
import { setSubjects } from "../context/subject-slice";

const Component = () => (
	<AllProviders>
		<SubjectsContainer />
		<FilterSubject />
	</AllProviders>
);

const subjects: ISubject[] = [
	{ subjectID: "1", listID: "1", name: "subject 01", amount: 1, tags: [], date: "", notes: "" },
	{ subjectID: "2", listID: "2", name: "subject 02", amount: 1, tags: [], date: "", notes: "" },
	{ subjectID: "3", listID: "3", name: "Subject 03", amount: 1, tags: [], date: "", notes: "" },
	{ subjectID: "4", listID: "4", name: "SUBJECT 04", amount: 1, tags: [], date: "", notes: "" },
];

describe("Filter subjects", () => {
	const user = userEvent.setup();

	const { getByRole, getAllByRole } = screen;

	beforeEach(() => {
		store.dispatch(setSubjects({ subjects }));
		render(<Component />);
	});

	it("Search subjects by name", async () => {
		await user.type(getByRole("search-subject"), "1");
		expect(getAllByRole("subject")).toHaveLength(1);

		await userEvent.clear(getByRole("search-subject"));
		await user.type(getByRole("search-subject"), "SUBJECT");
		expect(getAllByRole("subject")).toHaveLength(4);
	});
});
