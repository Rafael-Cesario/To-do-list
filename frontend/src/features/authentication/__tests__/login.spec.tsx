import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/lib/all-providers";
import { Notification } from "@/components/notification";
import { Login } from "../login";
import { cleanup, render, screen } from "@testing-library/react";

import * as MutationsUser from "@/utils/hooks/use-mutations-user";
const mockMutationsUser = MutationsUser as { useMutationsUser: object };

const Component = () => (
	<AllProviders>
		<Notification />
		<Login setFormName={vi.fn()} />
	</AllProviders>
);

describe("Login", () => {
	const user = userEvent.setup();
	let error = "";

	mockMutationsUser.useMutationsUser = () => ({
		loginRequest: () => {
			if (error) throw new Error(error);
		},
	});

	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Show error on submit form", async () => {
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("email-error")).toHaveTextContent("Este campo não pode ficar vazio");
	});

	it.todo("Saves user data on cookies");

	it.todo("Show notification due to response error");
});

vi.mock("@/utils/hooks/use-mutations-user");

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useServerInsertedHTML: vi.fn(),
}));
