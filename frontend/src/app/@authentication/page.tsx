"use client";
import { produce } from "immer";
import { StyledAuth } from "@/styles/styled-auth";
import { useState } from "react";

const defaultUserData = {
	email: "",
	name: "",
	password: "",
	passwordCheck: "",
};

const Authentication = () => {
	const [userData, setUserData] = useState(defaultUserData);

	const changeUserData = (key: keyof typeof defaultUserData, value: string) => {
		const newData = produce(userData, (draft) => {
			draft[key] = value;
		});

		setUserData(newData);
	};

	const createUser = () => {
		console.log({ userData });
	};

	return (
		<StyledAuth>
			<h1 className="title">Criar conta</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createUser();
				}}>
				<div className="field-container">
					<div className="field">
						<label htmlFor="email">Email</label>
						<input value={userData.email} onChange={(e) => changeUserData("email", e.target.value)} type="text" placeholder="meuEmail@domínio.com" id="email" />
						<span className="error">Seu email não é valido</span>
					</div>

					<div className="field">
						<label htmlFor="name">Nome</label>
						<input value={userData.name} onChange={(e) => changeUserData("name", e.target.value)} type="text" id="name" placeholder="Meu nome" />
						<span className="error">Seu nome é muito curto</span>
					</div>

					<div className="field">
						<label htmlFor="password">Senha</label>
						<input value={userData.password} onChange={(e) => changeUserData("password", e.target.value)} type="text" placeholder="..." id="password" />
						<span className="error">Sua senha deve conter letrar e números</span>
					</div>

					<div className="field">
						<label htmlFor="password-check">Confirmar senha</label>
						<input value={userData.passwordCheck} onChange={(e) => changeUserData("passwordCheck", e.target.value)} type="text" id="password-check" placeholder="..." />
						<span className="error">Suas senhas devem ser iguáis</span>
					</div>
				</div>

				<button className="submit">Entrar</button>

				<button type="button" className="form">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledAuth>
	);
};

export default Authentication;
