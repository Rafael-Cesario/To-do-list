import * as MutationsList from "@/utils/hooks/use-mutations-list";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { Sidebar } from "../sidebar";
import { AllProviders } from "@/lib/all-providers";
import { Notification } from "@/components/notification";
import { RCreateList } from "@/services/interfaces/list";
import { ListActions } from "../components/list-actions";

const Component = () => (
	<AllProviders>
		<Notification />
		<Sidebar />
		<ListActions />
	</AllProviders>
);

describe("Sidebar", () => {
	const user = userEvent.setup();
	const mockMutationsList = MutationsList as { useMutationsList: object };
	const createListData: RCreateList = { createList: { listID: "123", name: "My new list", subjectsLength: 0, userID: "123" } };

	mockMutationsList.useMutationsList = () => ({
		createListRequest: () => ({ data: createListData }),
	});

	const { getByRole, getAllByRole } = screen;

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

	it.todo("Rename list");

	it.todo("Delete list");
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
