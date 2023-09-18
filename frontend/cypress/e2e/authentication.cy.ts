import { CyHttpMessages } from "cypress/types/net-stubbing";

const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const aliasMutaton = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

describe("Authentication", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	describe("Create user", () => {
		it("Creates a new user", () => {
			cy.intercept("POST", url, (req) => aliasMutaton(req, "CreateUser", { data: { createUser: "New user created" } }));

			cy.get("[data-cy='email-input']").type("user01@email.com");
			cy.get("[data-cy='name-input']").type("user01");
			cy.get("[data-cy='password-input']").type("Password123");
			cy.get("[data-cy='passwordCheck-input']").type("Password123");
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateUser");

			cy.get("[data-cy='email-input']").should("have.value", "");
			cy.get("[data-cy='notification'] > .title").should("have.text", "Novo usuário criado");
		});

		it("Catch an response error for duplicated user", () => {
			cy.intercept("POST", url, (req) => aliasMutaton(req, "CreateUser", { errors: [{ message: "duplicated:" }] }));

			cy.get("[data-cy='email-input']").type("user01@email.com");
			cy.get("[data-cy='name-input']").type("user01");
			cy.get("[data-cy='password-input']").type("Password123");
			cy.get("[data-cy='passwordCheck-input']").type("Password123");
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateUser");

			cy.get("[data-cy='email-input']").should("have.value", "user01@email.com");
			cy.get("[data-cy='notification'] > .title").should("have.text", "Ops, algo deu errado");
		});
	});
});
