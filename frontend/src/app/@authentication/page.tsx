"use client";
import { CreateAccount } from "@/features/authentication/create-account";
import { Login } from "@/features/authentication/login";
import { useState } from "react";

const Authentication = () => {
	const [formActive, setFormActive] = useState<"login" | "create">("login");
	const Form = formActive === "login" ? <Login props={{ setFormActive }} /> : <CreateAccount props={{ setFormActive }} />;
	return Form;
};

export default Authentication;
