import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { CreateAccount } from "../create-account";
import { Notification } from "@/components/notification";
import { AllProviders } from "@/lib/all-providers";

const Component = () => (
	<AllProviders>
		<Notification />
		<CreateAccount setFormName={vi.fn()} />
	</AllProviders>
);

describe("Create account component", () => {
	const user = userEvent.setup();

	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Show error on input change", async () => {
		await user.type(screen.getByRole("email"), "not-a-valid-email");
		expect(screen.getByRole("email-error")).toHaveTextContent("Email invalido. Ex: nome@exemplo.com");
	});

	it.todo("Show errors on submit form");

	it.todo("Send notification after creating user");

	it.todo("Catch a response error and show a notification");
});
