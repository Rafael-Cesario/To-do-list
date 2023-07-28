import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { CreateAccount } from "../create-account";
import { Notification } from "@/components/notification";
import { AllProviders } from "@/lib/all-providers";
import { errorsMap } from "@/services/errors-map";

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
	let error = "";

	mockMutationsUser.useMutationsUser = () => ({
		createUserRequest: () => {
			if (error) throw new Error(error);
		},
	});

	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Show and remove error on input change", async () => {
		await user.type(screen.getByRole("email"), "not-a-valid-email");
		expect(screen.getByRole("email-error")).toHaveTextContent("Email invalido. Ex: nome@exemplo.com");
		await user.clear(screen.getByRole("email"));
		await user.type(screen.getByRole("email"), "email@valid.com");
		expect(screen.getByRole("email-error")).toHaveTextContent("");
	});

	it("Show errors on submit form", async () => {
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("email-error")).toHaveTextContent("Este campo não pode ficar vazio");
	});

	it("Send notification after creating user", async () => {
		await user.type(screen.getByRole("email"), "my@email.com");
		await user.type(screen.getByRole("name"), "myName");
		await user.type(screen.getByRole("password"), "myPassword123");
		await user.type(screen.getByRole("passwordConfirmation"), "myPassword123");
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Novo usuário criado");
	});

	it("Catch a response error and show a notification", async () => {
		error = "duplicated: ";
		await user.type(screen.getByRole("email"), "my@email.com");
		await user.type(screen.getByRole("name"), "myName");
		await user.type(screen.getByRole("password"), "myPassword123");
		await user.type(screen.getByRole("passwordConfirmation"), "myPassword123");
		await user.click(screen.getByRole("submit-form"));
		expect(screen.getByRole("notification").querySelector(".message")).toHaveTextContent(errorsMap.user.duplicated);
	});
});

vi.mock("@/utils/hooks/use-mutations-user");
