class Validations {
	email(email: string) {
		const error = "Seu email não é valido";

		const symbol = email.includes("@");
		if (!symbol) return error;

		const [user, host] = email.split("@");
		if (!user || !host) return error;

		return "";
	}

	name(name: string) {
		if (name.length < 3 || name.length > 30) return "Seu nome deve conter entre 3 a 30 letras.";
		return "";
	}

	password(password: string) {
		if (password.length < 10) return "Sua senha deve conter ao menos 10 letras ou números.";
		if (!/[A-Z]/.test(password)) return "Sua senha deve conter ao menos uma letra maiúscula";
		if (!/[a-z]/.test(password)) return "Sua senha deve conter ao menos uma letra minúscula";
		if (!/[0-9]/.test(password)) return "Sua senha deve conter ao menos um número";
		return "";
	}

	passwordCheck(passwordCheck: string, password: string) {
		if (passwordCheck !== password) return "Suas senhas devem ser iguais.";
		return "";
	}
}

export const validations = new Validations();
