import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Notification } from "@/components/notification";
import { Sidebar } from "../sidebar";
import { AllProviders } from "@/lib/all-providers";
import { cleanup, render, screen } from "@testing-library/react";
import { store } from "@/context/store";
import { setLists } from "../context/list-slice";
import { act } from "react-dom/test-utils";
import * as MutationsList from "@/utils/hooks/use-mutations-list";

const Component = () => (
	<AllProviders>
		<Notification />
		<Sidebar />
	</AllProviders>
);

describe("Home - Sidebar - Create list", () => {
	const mockMutationsList = MutationsList as { useMutationsList: object };
	const user = userEvent.setup();
	const listName = "A new list";
	const { getByRole, queryByRole, getAllByRole } = screen;

	mockMutationsList.useMutationsList = () => ({
		createListRequest: () => ({ data: { createList: { listID: "123", userID: "123", name: listName } } }),
	});

	beforeEach(() => {
		render(<Component />);
		act(() => store.dispatch(setLists({ lists: [{ listID: "unique", userID: "unique", name: "list01" }] })));
	});

	afterEach(() => cleanup());

	it("Open and close create list container", async () => {
		await user.click(getByRole("open-close-create-list-container"));
		expect(getByRole("create-list-container")).toBeInTheDocument();
		await user.click(getByRole("open-close-create-list-container"));
		expect(queryByRole("create-list-container")).not.toBeInTheDocument();
	});

	it("Create a new list and show on the sidebar", async () => {
		await user.click(getByRole("open-close-create-list-container"));
		await user.type(getByRole("list-name"), listName);
		await user.click(getByRole("submit"));

		const lists = getAllByRole("list-item");

		expect(getByRole("list-name")).toHaveValue("");
		expect(getByRole("notification").querySelector(".message")).toHaveTextContent("Sua nova lista foi criada com sucesso");
		expect(lists).toHaveLength(2);
		expect(lists[lists.length - 1]).toHaveTextContent(listName);
		expect(lists[0].className).toBe("");
		expect(lists[lists.length - 1].className).toBe("active");
	});

	it("Show a error if user try to create a list without a name", async () => {
		await user.click(getByRole("open-close-create-list-container"));
		await user.click(getByRole("submit"));
		expect(getByRole("label-list-name")).toHaveTextContent("Sua lista precisa de um nome");
	});

	it.todo("Show a notification due to request error");
});

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ userID: "123" });
	const cookies = new Cookies();
	return { cookies };
});

vi.mock("@/utils/hooks/use-mutations-list");
