import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TagContainer } from "../../components/subject-area/tag-container";

describe("Tag container", () => {
	const user = userEvent.setup();

	beforeEach(() => {
		render(<TagContainer />);
	});

	it("Open and close tag container", async () => {
		await user.click(screen.getByRole("open-container"));
		expect(screen.getByRole("create-tag-container")).toBeInTheDocument();
		await user.click(screen.getByRole("close-tag-container"));
		expect(screen.queryByRole("create-tag-container")).not.toBeInTheDocument();
	});

	it("Move the icon to the clicked/selected color", async () => {
		await user.click(screen.getByRole("open-container"));
		await user.click(screen.getByRole("blue").children[0]);
		expect(screen.getByRole("black").children).toHaveLength(1);
		expect(screen.getByRole("blue").children[1]).toBeInTheDocument();
	});

	it("Show feedback if tag has no name", async () => {
		await user.click(screen.getByRole("open-container"));
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("feedback")).toBeInTheDocument();
	});
});
