import { StyledAuth } from "@/styles/styled-auth";

const Authentication = () => {
	return (
		<StyledAuth>
			<h1 className="title">Criar conta</h1>

			<div className="field-container">
				<div className="field">
					<label htmlFor="email">Email</label>
					<input type="text" placeholder="meuEmail@domínio.com" id="email" />
					<span className="error">Seu email não é valido</span>
				</div>

				<div className="field">
					<label htmlFor="name">Nome</label>
					<input type="text" id="name" placeholder="Meu nome" />
					<span className="error">Seu nome é muito curto</span>
				</div>

				<div className="field">
					<label htmlFor="password">Senha</label>
					<input type="text" placeholder="..." id="password" />
					<span className="error">Sua senha deve conter letrar e números</span>
				</div>

				<div className="field">
					<label htmlFor="password-check">Confirmar senha</label>
					<input type="text" id="password-check" placeholder="..." />
					<span className="error">Suas senhas devem ser iguáis</span>
				</div>
			</div>

			<button className="submit">Entrar</button>
			<button className="form">Não tem uma conta? Clique aqui para criar.</button>
		</StyledAuth>
	);
};

export default Authentication;
