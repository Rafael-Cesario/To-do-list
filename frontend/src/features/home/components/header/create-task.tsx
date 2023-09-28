import { useState } from "react";
import { StyledCreateTask } from "./styles/styled-create-task";

export const CreateTask = () => {
	const [isOpen, setIsOpen] = useState(true);

	const tagColors = {
		gray: "#222222",
		red: "#973E3E",
		brown: "#5B3124",
		orange: "#B54F2F",
		yellow: "#D8AE1C",
		green: "#3D7921",
		lightBlue: "#1060CC",
		darkBlue: "#213479",
		purple: "#481F72",
		pink: "#B024A2",
	};

	return (
		<>
			<button className="create-task">Adicionar tarefa</button>

			{isOpen && (
				<StyledCreateTask>
					<div className="container">
						<button className="close">x</button>

						<h1 className="title">Nova Tarefa</h1>

						<div className="field-name">
							<label className="field-title" htmlFor="name">
								Titulo
							</label>
							<input type="text" id="name" placeholder="Tarefa para fazer" />
							<span className="error">Sua tarefa precisa de um titulo</span>
						</div>

						<div className="field-description">
							<label className="field-title" htmlFor="description">
								Descrição ou anotações
							</label>

							<textarea name="description" id="description" placeholder="Links, notas, descrição..."></textarea>
						</div>

						<div className="field-status">
							<h2 className="field-title">Status</h2>

							<div className="status">
								<button className="next active">Próximas</button>
								<button className="current">Em Progresso</button>
								<button className="done">Concluídas</button>
							</div>
						</div>

						<div className="field-tag">
							<h2 className="field-title">Tags</h2>

							<div className="colors">
								{Object.entries(tagColors).map(([name, color]) => (
									<button className="color" key={name} style={{ backgroundColor: color }} name={name} />
								))}
							</div>

							<div>
								<input type="text" className="tag-name" placeholder="Nova tag" />
								<button className="tag-create">+</button>
							</div>

							<div className="tag-container">
								<div className="tag" style={{ backgroundColor: tagColors.red }}>
									<span>Importante</span>
									<button className="remove-tag">x</button>
								</div>
							</div>
						</div>

						<button className="submit-task">Criar</button>
					</div>
				</StyledCreateTask>
			)}
		</>
	);
};
