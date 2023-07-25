import { prisma } from "./database";
import { startServer } from "./server";

const main = () => {
	startServer();
	prisma.$connect();
};

main();
