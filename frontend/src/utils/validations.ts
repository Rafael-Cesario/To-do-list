class Validations {
	email(email: string) {
		if (!email) return "Este campo não pode ficar vazio";

		const [user, domain] = email.split("@");
		if (!user || !domain) return "Email invalido. Ex: nome@exemplo.com";

		return "";
	}

	password(password: string) {
		if (!password) return "Este campo não pode ficar vazio";
		if (password.length < 8) return "Sua senha precisa ter ao menos 8 caracteres";
		if (!password.match(/[a-z]/)) return "Sua senha deve conter ao menos uma letra minúscula";
		if (!password.match(/[A-Z]/)) return "Sua senha deve conter ao menos uma letra maiúscula";
		return "";
	}
}

export const validations = new Validations();
