import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/lib/all-providers";
import { Notification } from "@/components/notification";
import { Login } from "../login";
import { cleanup, render, screen } from "@testing-library/react";

import * as MutationsUser from "@/utils/hooks/use-mutations-user";
import { errorsMap } from "@/services/errors-map";
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

	it("Show notification due to response error", async () => {
		error = "invalidCredentials: ";
		await user.type(screen.getByRole("email"), "email@test.com");
		await user.type(screen.getByRole("password"), "Password123");
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("notification").querySelector(".message")).toHaveTextContent(errorsMap.user.invalidCredentials);
	});
});

vi.mock("@/utils/hooks/use-mutations-user");

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useServerInsertedHTML: vi.fn(),
}));
