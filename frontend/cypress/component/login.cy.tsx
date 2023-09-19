import { Login } from "@/features/login";

describe("Login", () => {
	beforeEach(() => {
		cy.mount(<Login />);
	});

	it("Can't submit with empty fields", () => {
		cy.get(`[data-cy="submit"]`).click();
		cy.get('[data-cy="email-error"]').should("have.text", "Este campo não pode ficar vazio");
	});
});
