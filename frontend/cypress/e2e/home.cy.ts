import { UserCookies } from "@/services/interfaces/cookies";
import { IList } from "@/services/interfaces/list";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const aliasMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

const lists: IList[] = [
	{ id: "01", name: "list01", userID: "01", tasks: [] },
	{ id: "02", name: "list02", userID: "02", tasks: [] },
	{ id: "03", name: "list03", userID: "03", tasks: [] },
	{ id: "04", name: "list04", userID: "04", tasks: [] },
	{ id: "05", name: "list05", userID: "05", tasks: [] },
];

describe("Home page", () => {
	beforeEach(() => {
		const cookies: UserCookies = { email: "user01@email.com", name: "user01", userID: "123", token: "qweqwe" };
		cy.intercept("POST", url, (req) => aliasMutation(req, "GetLists", { data: { getLists: lists } }));
		cy.setCookie("user", JSON.stringify(cookies));
		cy.visit("/");
		cy.wait("@GetLists");
	});

	describe("Sidebar", () => {
		it("Creates a new list", () => {
			const listName = "New List";
			cy.intercept("POST", url, (req) => aliasMutation(req, "CreateList", { data: { createList: { id: lists.length + 1, name: listName, userID: lists.length + 1 } } }));
			cy.get('[data-cy="create-list"]').click();
			cy.get('[data-cy="create-list-container"]').should("exist");
			cy.get('[data-cy="name"]').should("be.focused").type(listName);
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateList");

			cy.get('[data-cy="notification"] > .title').should("have.text", "Nova lista");
			cy.get('[data-cy="list-container"] > div').should("have.length", lists.length + 1);
			cy.get('[data-cy="create-list-container"]').should("not.exist");
		});

		it("Search for a list", () => {
			cy.get("[data-cy='search-list']").type("3");
			cy.get('[data-cy="list-container"] > div').should("have.length", 1);
			cy.get("[data-cy='search-list']").clear();
			cy.get('[data-cy="list-container"] > div').should("have.length", lists.length);
		});

		it("Set a list as active", () => {
			cy.get('[data-cy="list-container"] > :nth-child(1)').click();
			cy.get(".active > .title").should("have.text", lists[0].name);

			cy.get("[data-cy='list-menu-0']").click();
			cy.get(".container > .title").should("have.text", lists[0].name);
		});

		describe("List menu", () => {
			describe("Rename list", () => {
				it("Rename a list", () => {
					const newName = "list new name";
					cy.intercept("POST", url, (req) => aliasMutation(req, "UpdateList", { data: { updateList: { ...lists[3], name: newName } } }));

					cy.get("[data-cy='list-menu-3']").click();
					cy.get(".container > .title").should("have.text", lists[3].name);
					cy.get("#name").type(newName);
					cy.get(`[data-cy="save"]`).click();
					cy.wait("@UpdateList");

					cy.get(".container > .title").should("have.text", newName);
					cy.get("[data-cy='close-list-menu']").click();
					cy.get('[data-cy="list-container"] > :nth-child(4) > li').should("have.text", newName);
					cy.get(".active > .title").should("have.text", newName);
				});

				it("Catch a response error", () => {
					cy.intercept("POST", url, (req) => aliasMutation(req, "UpdateList", { errors: [{ message: "duplicated:" }] }));
					cy.get("[data-cy='list-menu-3']").click();
					cy.get("#name").type("name for a list");
					cy.get(`[data-cy="save"]`).click();
					cy.wait("@UpdateList");
					cy.get(`[data-cy="error"]`).should("have.text", "Uma lista com o mesmo nome já existe.");
				});

				it("Catch an unknow response error", () => {
					cy.intercept("POST", url, (req) => aliasMutation(req, "UpdateList", { errors: [{ message: "unknowError" }] }));
					cy.get(`[data-cy="list-menu-3"]`).click();
					cy.get("#name").type("Name for a list");
					cy.get(`[data-cy="save"]`).click();
					cy.wait("@UpdateList");
					cy.get("[data-cy='notification'] > .text").should("contain.text", "Um erro inesperado ocorreu");
				});

				it("Show an error due to submit with empty list name", () => {
					cy.get(`[data-cy="list-menu-3"]`).click();
					cy.get(`[data-cy="save"]`).click();
					cy.get(`[data-cy="error"]`).should("have.text", "Sua lista precisa de um nome");
				});
			});

			describe("Delete list", () => {
				it("Delete a list", () => {
					cy.intercept("POST", url, (req) => aliasMutation(req, "DeleteList", { data: { deleteList: "List deleted" } }));
					cy.get("[data-cy='list-menu-3']").click();
					cy.get("[data-cy='delete']").click();
					cy.get("[data-cy='confirm-delete']").click();
					cy.wait("@DeleteList");
					cy.get("[data-cy='list-container'] > .list").should("have.length", lists.length - 1);
					cy.get("[data-cy='notification'] > .title").should("have.text", "Lista removida");
				});

				it("Catch a error", () => {
					cy.intercept("POST", url, (req) => aliasMutation(req, "DeleteList", { errors: [{ message: "unknowError" }] }));
					cy.get("[data-cy='list-menu-3']").click();
					cy.get("[data-cy='delete']").click();
					cy.get("[data-cy='confirm-delete']").click();
					cy.wait("@DeleteList");
					cy.get("[data-cy='list-container'] > .list").should("have.length", lists.length);
					cy.get("[data-cy='notification'] > .text").should("contain.text", "Um erro inesperado ocorreu");
				});
			});
		});
	});
});
