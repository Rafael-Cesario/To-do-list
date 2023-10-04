import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/lib/all-providers";
import { SearchList } from "../components/sidebar/search-list";
import { ListContainer } from "../components/sidebar/list-container";
import { IList } from "@/services/interfaces/list";
import { render, screen } from "@testing-library/react";
import { store } from "@/context/store";
import { setLists } from "../context/list-slice";

const Component = () => (
	<AllProviders>
		<SearchList />
		<ListContainer />
	</AllProviders>
);

const lists: IList[] = [
	{ listID: "1", name: "list 01", subjectsLength: 0, userID: "1" },
	{ listID: "2", name: "List-02", subjectsLength: 0, userID: "2" },
	{ listID: "3", name: "LIST 03", subjectsLength: 0, userID: "3" },
];

describe("Search list", () => {
	const user = userEvent.setup();

	beforeAll(() => {
		store.dispatch(setLists({ lists }));
		render(<Component />);
	});

	it("Search for a list", async () => {
		const searchInput = screen.getByRole("search-list");

		await user.type(searchInput, "1");
		expect(screen.getAllByRole("list-item")).toHaveLength(1);

		await user.clear(searchInput);
		await user.type(searchInput, "list");
		expect(screen.getAllByRole("list-item")).toHaveLength(3);
	});
});
