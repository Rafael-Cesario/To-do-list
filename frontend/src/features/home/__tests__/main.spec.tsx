import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/lib/all-providers";
import { render, screen, waitFor } from "@testing-library/react";
import { Main } from "../main";
import { ISubject } from "@/services/interfaces/subjects";
import { Notification } from "@/components/notification";

const renderComponent = async () => {
	const Component = () => (
		<AllProviders>
			<Notification />
			<Main />
		</AllProviders>
	);

	await waitFor(() => {
		render(<Component />);
	});
};

describe("Main component", () => {
	describe("Subject area", () => {
		const user = userEvent.setup();

		beforeAll(async () => {
			await renderComponent();
		});

		it("Delete a subject and remove it from the page", async () => {
			let subjects = screen.getAllByRole("subject");
			await user.click(subjects[0]);
			await user.click(screen.getByRole("delete-subject"));
			await user.click(screen.getByRole("submit"));

			subjects = screen.getAllByRole("subject");
			expect(subjects.length).toBe(3);
			expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Assunto removido");
			expect(screen.queryByRole("subject-area")).not.toBeInTheDocument();
		});
	});
});

vi.mock("@/utils/hooks/use-mutations-subject", () => ({
	useMutationsSubject: () => ({
		createSubjectRequest: vi.fn(),
		updateSubjectRequest: vi.fn(),
		deleteSubjectRequest: vi.fn(),
	}),
}));

vi.mock("@/services/client", () => {
	const subjects: ISubject[] = [
		{ subjectID: "1", listID: "1", name: "subject 01", amount: 1, tags: [], date: "", notes: "" },
		{ subjectID: "2", listID: "2", name: "subject 02", amount: 1, tags: [], date: "", notes: "" },
		{ subjectID: "3", listID: "3", name: "Subject 03", amount: 1, tags: [], date: "", notes: "" },
		{ subjectID: "4", listID: "4", name: "SUBJECT 04", amount: 1, tags: [], date: "", notes: "" },
	];

	const getSubjects: ISubject[] = subjects;
	const data = { getSubjects };
	const client = { query: () => ({ data }) };
	return { client };
});
