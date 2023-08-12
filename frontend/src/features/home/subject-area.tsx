import { StyledSubjectArea } from "./styles/subject-area/subject-area-style";

export const SubjectArea = () => {
	return (
		<StyledSubjectArea>
			<div className="container">
				<button className="close">x</button>

				<h1 className="title">Hello</h1>

				<div className="details">
					<span>Adicionado 4x</span>
					<span>11/08/2023</span>
				</div>

				<div className="notes">
					<h2 className="title">Anotações</h2>
					<textarea name="notes" placeholder="Adicione suas anotações aqui. Ex: Links"></textarea>
				</div>

				{/* tags */}
				{/* Delete subject */}
				{/* Save changes */}
			</div>
		</StyledSubjectArea>
	);
};
