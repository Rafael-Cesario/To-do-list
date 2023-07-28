import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { CreateAccount } from "../create-account";
import { Notification } from "@/components/notification";
import { AllProviders } from "@/lib/all-providers";

import * as MutationsUser from "@/utils/hooks/use-mutations-user";
const mockMutationsUser = MutationsUser as { useMutationsUser: object };

const Component = () => (
	<AllProviders>
		<Notification />
		<CreateAccount setFormName={vi.fn()} />
	</AllProviders>
);

describe("Create account component", () => {
	const user = userEvent.setup();

	mockMutationsUser.useMutationsUser = () => ({
		createUserRequest: vi.fn(),
	});

	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Show error on input change", async () => {
		await user.type(screen.getByRole("email"), "not-a-valid-email");
		expect(screen.getByRole("email-error")).toHaveTextContent("Email invalido. Ex: nome@exemplo.com");
	});

	it("Show errors on submit form", async () => {
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("email-error")).toHaveTextContent("Este campo não pode ficar vazio");
	});

	it.only("Send notification after creating user", async () => {
		await user.type(screen.getByRole("email"), "my@email.com");
		await user.type(screen.getByRole("name"), "myName");
		await user.type(screen.getByRole("password"), "myPassword123");
		await user.type(screen.getByRole("passwordConfirmation"), "myPassword123");
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Novo usuário criado");
	});

	it.todo("Catch a response error and show a notification");
});

vi.mock("@/utils/hooks/use-mutations-user");
