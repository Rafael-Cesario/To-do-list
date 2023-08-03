import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Notification } from "@/components/notification";
import { Sidebar } from "../sidebar";
import { AllProviders } from "@/lib/all-providers";
import { render, screen } from "@testing-library/react";
import { store } from "@/context/store";
import { setLists } from "../context/list-slice";
import { act } from "react-dom/test-utils";

const Component = () => (
	<AllProviders>
		<Notification />
		<Sidebar />
	</AllProviders>
);

describe("Home - Sidebar - Create list", () => {
	const user = userEvent.setup();

	beforeAll(() => {
		render(<Component />);
		act(() => store.dispatch(setLists({ lists: [{ listID: "unique", userID: "unique", name: "list01" }] })));
	});

	it("Open and close create list container", async () => {
		await user.click(screen.getByRole("open-close-create-list-container"));
		expect(screen.getByRole("create-list-container")).toBeInTheDocument();
		await user.click(screen.getByRole("open-close-create-list-container"));
		expect(screen.queryByRole("create-list-container")).not.toBeInTheDocument();
	});

	it.todo("Create a new list and show on the sidebar", async () => {
		// reset listname
		// show a notification
		// show list on the page
		// set list as active
	});

	it.todo("Show a error if user try to create a list without a name");

	it.todo("Show a notification due to request error");
});

vi.mock("@/services/cookies", () => ({
	get: () => ({ userID: "123" }),
}));

vi.mock("@/utils/hooks/use-mutations-list", () => ({
	useMutationsList: () => ({
		createListRequest: (input: { name: string }) => ({
			data: { createList: { listID: "123", userID: "123", name: input.name } },
		}),
	}),
}));
