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

const list: IList = { id: "123", name: "list01", userID: "123", tasks: [] };

describe("Home page", () => {
	beforeEach(() => {
		const cookies: UserCookies = { email: "user01@email.com", name: "user01", userID: "123", token: "qweqwe" };
		cy.setCookie("user", JSON.stringify(cookies));
		cy.visit("/");
		cy.intercept("POST", url, (req) => aliasMutaton(req, "GetLists", { data: { getLists: [list] } }));
		cy.wait("@GetLists");
	});

	describe("Sidebar", () => {
		it("Creates a new list", () => {
			const listName = "List 02";
			cy.intercept("POST", url, (req) => aliasMutaton(req, "CreateList", { data: { createList: { id: "321", name: listName, userID: "123" } } }));
			cy.get('[data-cy="create-list"]').click();
			cy.get('[data-cy="create-list-container"]').should("exist");
			cy.get('[data-cy="name"]').should("be.focused").type(listName);
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateList");

			cy.get('[data-cy="notification"] > .title').should("have.text", "Nova lista");
			cy.get('[data-cy="list-container"] > div').should("have.length", 2);
			cy.get('[data-cy="create-list-container"]').should("not.exist");
		});
	});
});
