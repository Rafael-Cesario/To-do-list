import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { store } from "@/context/store";
import { setActive } from "@/features/home/context/subject-slice";
import { SubjectArea } from "@/features/home/subject-area";
import { AllProviders } from "@/lib/all-providers";
import { ISubject } from "@/services/interfaces/subjects";
import { render, screen } from "@testing-library/react";

describe("Subject area", () => {
	describe("Feedback", () => {
		const user = userEvent.setup();

		beforeAll(() => {
			const subject: ISubject = { amount: 2, date: "00/00/00", listID: "1", name: "Something to study", notes: "", subjectID: "1", tags: [] };
			store.dispatch(setActive({ subject }));
		});

		beforeEach(() => {
			render(
				<AllProviders>
					<SubjectArea />
				</AllProviders>
			);
		});

		it("Show a message if user tries to save a subject without a name", async () => {
			await user.clear(screen.getByRole("subject-name"));
			await user.click(screen.getByRole("save"));
			expect(screen.getByRole("feedback")).toBeInTheDocument();
		});

		it("Closes feedback message", async () => {
			await user.clear(screen.getByRole("subject-name"));
			await user.click(screen.getByRole("save"));

			const closeFeedback = screen.getByRole("feedback").querySelector(".close") as HTMLButtonElement;
			await user.click(closeFeedback);

			expect(screen.queryByRole("feedback")).not.toBeInTheDocument();
		});
	});
});
