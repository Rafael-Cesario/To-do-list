import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TagContainer } from "../../components/subject-area/tag-container";

describe("Tag container", () => {
	const user = userEvent.setup();

	beforeAll(() => {
		render(<TagContainer />);
	});

	it("Open and close tag container", async () => {
		await user.click(screen.getByRole("open-container"));
		expect(screen.getByRole("create-tag-container")).toBeInTheDocument();
		await user.click(screen.getByRole("close-tag-container"));
		expect(screen.queryByRole("create-tag-container")).not.toBeInTheDocument();
	});
});
