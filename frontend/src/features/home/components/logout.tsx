"use client";

import { cookies } from "@/services/cookies";
import { useRouter } from "next/navigation";

export const Logout = () => {
	const router = useRouter();

	const logout = async () => {
		await cookies.delete("user");
		router.refresh();
	};

	return (
		<button className="logout" onClick={() => logout()}>
			Sair
		</button>
	);
};
