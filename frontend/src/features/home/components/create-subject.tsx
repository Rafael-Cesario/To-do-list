import { StyledCreateSubject } from "../styles/create-subject-style";

export const CreateSubject = () => {
	return (
		<StyledCreateSubject>
			<input className="name" type="text" placeholder="Digite aqui seu novo assunto de estudos" />
			<button className="submit">Adicionar</button>
		</StyledCreateSubject>
	);
};
