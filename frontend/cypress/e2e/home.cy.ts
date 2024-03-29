import { UserCookies } from "@/services/interfaces/cookies";
import { IList } from "@/services/interfaces/list";
import { ITask, TaskInput, Status } from "@/services/interfaces/task";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const url = process.env.NEXT_PUBLIC_API_URL ?? "";

const aliasMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

const tasks: ITask[] = [
	{
		id: "01",
		listID: "01",
		title: "task01",
		description: "",
		status: Status.NEXT,
		createdAt: new Date("10/10/10"),
		tags: [],
	},

	{
		id: "02",
		listID: "02",
		title: "task02",
		description: "",
		status: Status.DONE,
		createdAt: new Date("02/02/02"),
		tags: [],
	},
];

const lists: IList[] = [
	{ id: "01", name: "list01", userID: "01", tasks: tasks },
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

	describe("Header", () => {
		beforeEach(() => {
			cy.get("[data-cy='list-container'] > :nth-child(1)").click();
		});

		it("Creates a new task", () => {
			const inputTask: TaskInput = {
				title: "Title for my task",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet varius nibh. Etiam molestie, ipsum eget finibus ultricies, magna.",
				status: Status.DONE,
				tags: [{ name: "important", color: "red" }],
			};

			cy.get(`[data-cy='open-create-task']`).click();
			cy.get('[data-cy="container-create-task"]').should("exist");

			cy.get(`[data-cy="input-title"]`).type(inputTask.title);
			cy.get(`[data-cy='input-description']`).type(inputTask.description);
			cy.get(`[data-cy="status"]`).eq(2).click();

			cy.get(`[data-cy="input-tag"]`).type(inputTask.tags[0].name);
			cy.get(`[data-cy="red"]`).click();
			cy.get(`[data-cy="create-tag"]`).click();
			cy.get(".tag-container").should("have.length", 1);

			const ResponseCreateTask: ITask = {
				...inputTask,
				id: "03",
				listID: lists[0].id,
				createdAt: new Date(Date.now()),
				tags: [{ id: "1", taskID: "1", ...inputTask.tags[0] }],
			};

			cy.intercept("POST", url, (req) => aliasMutation(req, "CreateTask", { data: { createTask: ResponseCreateTask } }));
			cy.get(`[data-cy="submit-task"]`).click();
			cy.wait("@CreateTask");

			cy.get('[data-cy="container-create-task"]').should("not.exist");
			cy.get(`[data-cy="task-03"] > .top > .title`).should("have.text", inputTask.title);
			cy.get(`[data-cy="task-03-status"]`).should("have.text", "Concluídas");
			cy.get(`[data-cy="task-03-description"]`).should("have.text", inputTask.description);
			cy.get(`[data-cy="task-03-tags"]`).should("have.length", inputTask.tags.length);
			cy.get(`[data-cy="task-03-tags"] > :nth-child(1)`).should("have.text", inputTask.tags[0].name);
		});

		it("Catch title errors", () => {
			cy.get(`[data-cy='open-create-task']`).click();
			cy.get(`[data-cy="submit-task"]`).click();
			cy.get(".field-name > .error").should("have.text", "Sua tarefa precisa de um titulo.");
			cy.get(`[data-cy="input-title"]`).should("have.focus");

			cy.get(`[data-cy="input-title"]`).type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id finibus dolor, eu auctor tortor. Vestibulum lectus.");
			cy.get(`[data-cy="submit-task"]`).click();
			cy.get(".field-name > .error").should("have.text", "Seu titulo não deve exceder 100 caracteres");
			cy.get(`[data-cy="input-title"]`).should("have.focus");
		});

		it("Catch unknow response error", () => {
			cy.intercept("POST", url, (req) => aliasMutation(req, "CreateTask", { errors: [{ message: "unknow" }] }));
			cy.get(`[data-cy='open-create-task']`).click();
			cy.get(`[data-cy="input-title"]`).type("Title");
			cy.get(`[data-cy="submit-task"]`).click();
			cy.wait("@CreateTask");
			cy.get('[data-cy="notification"] > .title').should("have.text", "Erro");
		});

		it("Filter task by title, date, status", () => {
			cy.get(`[data-cy="search-task"]`).type("task02");
			cy.get(`[data-cy="task-container"] > .task`).should("have.length", 1);

			cy.get(`[data-cy="search-task"]`).clear().type("2002");
			cy.get(`[data-cy="task-container"] > .task`).should("have.length", 1);

			cy.get(`[data-cy="search-task"]`).clear().type("próximas");
			cy.get(`[data-cy="task-container"] > .task`).should("have.length", 1);
		});
	});

	describe("Main", () => {
		beforeEach(() => {
			cy.get("[data-cy='list-container'] > :nth-child(1)").click();
		});

		it("Update a task", () => {
			const updateTaskResponse: ITask = {
				...tasks[0],
				title: "New task name",
				tags: [{ color: "gray", name: "New tag", id: "01", taskID: tasks[0].id }],
				status: Status.DONE,
			};

			cy.get('[data-cy="task-01"]').click();
			cy.get('[data-cy="container-create-task"] > .title').should("have.text", tasks[0].title);
			cy.get('[data-cy="input-title"]').clear().type(updateTaskResponse.title);
			cy.get(".status > .done").click();
			cy.get('[data-cy="input-tag"]').type(updateTaskResponse.tags[0].name);
			cy.get('[data-cy="create-tag"]').click();

			cy.intercept("POST", url, (req) => aliasMutation(req, "UpdateTask", { data: { updateTask: updateTaskResponse } }));
			cy.get(".buttons > :nth-child(1)").click();
			cy.wait("@UpdateTask");

			cy.get('[data-cy="task-01-title"]').should("have.text", updateTaskResponse.title);
			cy.get('[data-cy="task-01-status"]').should("have.text", "Concluídas");
			cy.get('[data-cy="task-01-tags"]').should("have.length", updateTaskResponse.tags.length);
		});

		it("Delete a task", () => {
			cy.intercept("POST", url, (req) => aliasMutation(req, "DeleteTask", { data: { deleteTask: "Task deleted" } }));
			cy.get('[data-cy="task-01"]').click();
			cy.get(`[data-cy="delete-task"]`).click();
			cy.get(`[data-cy="confirm-delete-task"]`).click();
			cy.wait("@DeleteTask");

			cy.get(`[data-cy="task-container"] > .task`).should("have.length", tasks.length - 1);
		});
	});
});
