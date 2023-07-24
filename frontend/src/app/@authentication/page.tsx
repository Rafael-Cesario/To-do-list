"use client";

import { CreateAccount } from "@/features/authentication/create-account";
import { Login } from "@/features/authentication/login";
import { StyledAuthentication } from "@/styles/authentication-style";
import { useState } from "react";

const Authentication = () => {
	const [formName, setFormName] = useState<"login" | "create">("login");

	return (
		<StyledAuthentication>
			<div className="line" />
			{formName === "login" && <Login setFormName={setFormName} />}
			{formName === "create" && <CreateAccount setFormName={setFormName} />}
		</StyledAuthentication>
	);
};

export default Authentication;
