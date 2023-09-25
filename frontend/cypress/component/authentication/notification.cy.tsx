import { Providers } from "@/lib/providers";
import { Notification } from "@/components/notification";
import { store } from "@/context/store";
import { NotificationSlice, setNotification } from "@/context/notification-slice";

describe("Notification", () => {
	const notificationData: NotificationSlice = {
		isOpen: true,
		type: "success",
		title: "Hello",
		message: "Testing my notification component",
	};

	beforeEach(() => {
		cy.mount(
			<Providers>
				<Notification />
			</Providers>
		);

		store.dispatch(setNotification({ newState: notificationData }));
	});

	it("Renders with values", () => {
		cy.get(`[data-cy="notification"] > .title`).should("have.text", notificationData.title);
		cy.get(`[data-cy="notification"] > .text`).should("have.text", notificationData.message);
	});

	it("Closes notification", () => {
		cy.get(`[data-cy="notification"] > .close`).click().should("not.exist");
	});
});
