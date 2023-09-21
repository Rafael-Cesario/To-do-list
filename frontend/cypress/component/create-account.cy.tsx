import { CreateAccount } from "@/features/authentication/create-account";
import { Providers } from "@/lib/providers";

const Component = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const setFormActive = (formName: "login" | "create") => {};

	return (
		<Providers>
			<CreateAccount props={{ setFormActive }} />
		</Providers>
	);
};

describe("Create account", () => {
	beforeEach(() => {
		cy.mount(<Component />);
	});

	// Todo > Should be a < Field /> Test
	it("Show and hide password", () => {
		cy.get(`[data-cy="password-hide"]`).click();
		cy.get(`[data-cy="password-input"]`).should("have.attr", "type", "text");
		cy.get(`[data-cy="password-show"]`).click();
		cy.get(`[data-cy="password-input"]`).should("have.attr", "type", "password");
	});

	it("Validate password input on change", () => {
		cy.get(`[data-cy="password-input"]`).type("1");
		cy.get(`[data-cy="password-error"]`).should("have.text", "Sua senha deve conter ao menos 10 letras ou números.");
		cy.get(`[data-cy="password-input"]`).type("Password123");
		cy.get(`[data-cy="password-error"]`).should("have.text", "");
	});

	it("show errors if user try to submit with empty fields", () => {
		cy.get(`[data-cy="submit"]`).click();
		cy.get(`[data-cy="email-error"]`).should("have.text", "Este campo não pode ficar vazio");
	});

	it("Show errors if user try to submit with errors", () => {
		cy.get(`[data-cy="email-input"]`).type("not valid");
		cy.get(`[data-cy="submit"]`).click();
		cy.get(`[data-cy="email-error"]`).should("have.text", "Seu email não é valido");
	});
});
