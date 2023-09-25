import { UserCookies } from "@/services/interfaces/cookies";
import { IList } from "@/services/interfaces/list";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const aliasMutaton = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
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
		cy.setCookie("user", JSON.stringify(cookies));
		cy.visit("/");
		cy.intercept("POST", url, (req) => aliasMutaton(req, "GetLists", { data: { getLists: lists } }));
		cy.wait("@GetLists");
	});

	describe("Sidebar", () => {
		it("Creates a new list", () => {
			const listName = "New List";
			cy.intercept("POST", url, (req) => aliasMutaton(req, "CreateList", { data: { createList: { id: lists.length + 1, name: listName, userID: lists.length + 1 } } }));
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
	});
});