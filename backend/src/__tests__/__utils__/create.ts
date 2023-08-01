import { prisma } from "../../database";

export const createUser = async () => {
	const user = await prisma.user.create({ data: { email: "user@test.com", name: "user", password: "123" } });
	return user;
};

export const createLists = async (amount: number, userID: string) => {
	let listNumber = 0;
	for (listNumber; listNumber < amount; listNumber++) {
		await prisma.list.create({ data: { userID, name: `list${listNumber}` } });
	}
};
