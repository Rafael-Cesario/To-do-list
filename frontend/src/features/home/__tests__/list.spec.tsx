import "@testing-library/jest-dom";
import * as MutationsList from "@/utils/hooks/use-mutations-list";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { Sidebar } from "../sidebar";
import { AllProviders } from "@/lib/all-providers";
import { Notification } from "@/components/notification";
import { RCreateList, RDeleteList, RRenameList } from "@/services/interfaces/list";
import { ListActions } from "../components/list-actions";

const Component = () => (
	<AllProviders>
		<Notification />
		<Sidebar />
		<ListActions />
	</AllProviders>
);

describe("List", () => {
	const user = userEvent.setup();
	const mockMutationsList = MutationsList as { useMutationsList: object };

	const createListData: RCreateList = { createList: { listID: "123", name: "My new list", subjectsLength: 0, userID: "123" } };
	const renameListData: RRenameList = { renameList: { listID: "123", name: "A new name for this list", userID: "123", subjectsLength: 2 } };
	const deleteListData: RDeleteList = { deleteList: "Sua lista foi deletada" };

	mockMutationsList.useMutationsList = () => ({
		createListRequest: () => ({ data: createListData }),
		renameListRequest: () => ({ data: renameListData }),
		deleteListRequest: () => ({ data: deleteListData }),
	});

	const { getByRole, getAllByRole, queryByRole } = screen;

	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Create new list", async () => {
		await user.click(getByRole("open-close-create-list-container"));
		await user.type(getByRole("list-name"), "My new list");
		await user.click(getByRole("submit"));

		expect(getByRole("notification").querySelector(".title")?.textContent).toBe("Nova lista criada");
		expect(getAllByRole("list-item")).toHaveLength(1);
		expect(getAllByRole("list-item")[0].className).toMatch(/active/);
	});

	it("Rename list", async () => {
		await user.click(getByRole("open-options"));
		await user.click(getByRole("rename"));

		expect(queryByRole("rename")).not.toBeInTheDocument();

		await user.type(getByRole("new-list-name"), renameListData.renameList.name);
		await user.click(getByRole("submit"));

		expect(queryByRole("rename")).not.toBeInTheDocument();
		expect(getAllByRole("list-item")[0].querySelector("li")?.textContent).toBe(renameListData.renameList.name);
		expect(getByRole("notification").querySelector(".title")?.textContent).toBe("Lista renomeada");
	});

	it("Delete list", async () => {
		await user.click(getByRole("open-options"));
		await user.click(getByRole("delete"));
		expect(queryByRole("delete")).not.toBeInTheDocument();

		await user.type(getByRole("delete-list-name"), renameListData.renameList.name);
		await user.click(getByRole("submit"));

		expect(getByRole("notification").querySelector(".title")?.textContent).toBe("Lista excluida");
		expect(queryByRole("list-item")).not.toBeInTheDocument();
	});
});

vi.mock("@/utils/hooks/use-mutations-list", () => ({
	useMutationsList: vi.fn(),
}));

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	const cookies = new Cookies();
	Cookies.prototype.get = () => ({ userID: "123" });
	return { cookies };
});
