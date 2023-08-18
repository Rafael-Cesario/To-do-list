"use client";
import { StyledTagContainer } from "./style/tag-container-style";
import { useState } from "react";

export const TagContainer = () => {
	const [createTagContainer, setCreateTagContainer] = useState(false);

	return (
		<StyledTagContainer>
			<div className="title">
				<h1 className="text">Tags</h1>
				<button role="open-container" className="create-button" onClick={() => setCreateTagContainer(true)}>
					+
				</button>
			</div>

			{createTagContainer && (
				<div className="create-tag-container" role="create-tag-container">
					<div className="create-tag">
						<h1 className="title">Criar tag</h1>

						<div className="name">
							<label htmlFor="tag-name">Nome</label>
							<input role="tag-name" type="text" id="tag-name" placeholder="Importante, finalizado..." />
						</div>

						<div className="colors-field">
							<p className="text">Escolha uma cor para sua nova tag</p>
							<div className="colors">
								<button style={{ backgroundColor: "#111" }} data-color="black" />
								<button style={{ backgroundColor: "#913030" }} data-color="red" />
								<button style={{ backgroundColor: "#a9592c" }} data-color="orange" />
								<button style={{ backgroundColor: "#caa522" }} data-color="yellow" />
								<button style={{ backgroundColor: "#2a7e38" }} data-color="green" />
								<button style={{ backgroundColor: "#124b80" }} data-color="blue" />
								<button style={{ backgroundColor: "#592a8e" }} data-color="purple" />
								<button style={{ backgroundColor: "#d76eaa" }} data-color="pink" />
							</div>
						</div>

						<button className="submit" role="submit">
							Criar minha tag
						</button>

						<button role="close-tag-container" onClick={() => setCreateTagContainer(false)} className="cancel">
							Cancelar
						</button>
					</div>
				</div>
			)}
		</StyledTagContainer>
	);
};
