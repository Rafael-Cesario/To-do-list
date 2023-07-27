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
	beforeEach(() => {
		render(<Component />);
	});

	afterEach(() => cleanup());

	it("Show error on input change", async () => {
		const title = screen.getByText("Criar conta");
		console.log({ title });
	});

	it.todo("Show errors on submit form");

	it.todo("Send notification after creating user");

	it.todo("Catch a response error and show a notification");
});
