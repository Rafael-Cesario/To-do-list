import * as MutationsList from "@/utils/hooks/use-mutations-list";
import userEvent from "@testing-library/user-event";
import { Notification } from "@/components/notification";
import { AllProviders } from "@/lib/all-providers";
import { Sidebar } from "../sidebar";
import { Header } from "../header";
import { act, cleanup, render, screen } from "@testing-library/react";
import { store } from "@/context/store";
import { setLists } from "../context/list-slice";
import { IList } from "@/services/interfaces/list";

const Component = () => {
	return (
		<AllProviders>
			<Notification />
			<Sidebar />
			<Header />
		</AllProviders>
	);
};

describe("Delete list", () => {
	const lists: IList[] = [{ userID: "123", listID: "123", name: "list01" }];
	const mockMutationsList = MutationsList as { useMutationsList: object };
	const user = userEvent.setup();

	mockMutationsList.useMutationsList = () => ({
		createListRequest: vi.fn(),
		renameListRequest: vi.fn(),
		deleteListRequest: vi.fn(),
	});

	beforeEach(async () => {
		render(<Component />);
		act(() => store.dispatch(setLists({ lists })));
		await user.click(screen.getAllByRole("list-item")[0]);
	});

	afterEach(() => cleanup());

	it("Renders", () => {
		screen.debug();
	});
});

vi.mock("@/services/cookies", () => {
	const Cookies = vi.fn();
	Cookies.prototype.get = () => ({ userID: "123" });
	const cookies = new Cookies();
	return { cookies };
});

vi.mock("@/utils/hooks/use-mutations-list");
