import { CyHttpMessages } from "cypress/types/net-stubbing";

const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const aliasMutaton = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

describe("Authentication", () => {
	describe("Create user", () => {
		beforeEach(() => {
			cy.visit("/");
			cy.get(`[data-cy="form"]`).click();
		});

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

		it("Catch a response error for duplicated user", () => {
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

	describe("Login", () => {
		beforeEach(() => {
			cy.visit("/");
		});

		it("Can't submit with empty fields", () => {
			cy.get('[data-cy="submit"]').click();
			cy.get('[data-cy="email-error"]').should("have.text", "Este campo não pode ficar vazio");
		});

		it("Catch a response error due to wrong credentials", () => {
			cy.intercept("POST", url, (req) => aliasMutaton(req, "Login", { errors: [{ message: "unauthorized" }] }));
			cy.get('[data-cy="email-input"]').type("notAnUser@domain.com");
			cy.get('[data-cy="password-input"]').type("Password123");
			cy.get('[data-cy="submit"]').click();
			cy.wait("@Login");
			cy.get('[data-cy="notification"] > .text').should("have.text", "Email ou senha incorretos");
		});

		it("Sends user to home page after login", () => {
			cy.intercept("POST", url, (req) => aliasMutaton(req, "Login", { data: { login: { token: "123qwe123", email: "notAnUser@domain.com" } } }));
			cy.get('[data-cy="email-input"]').type("notAnUser@domain.com");
			cy.get('[data-cy="password-input"]').type("Password123");
			cy.get('[data-cy="submit"]').click();
			cy.wait("@Login");
			cy.get(`.title`).should("not.exist");
			cy.getCookie("user").should("exist");
		});
	});
});
