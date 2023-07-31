class ListServices {
	getLists({ userID }: { userID: string }) {
		console.log({ userID });
	}
}

export const listServices = new ListServices();
