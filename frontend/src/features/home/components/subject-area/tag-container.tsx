"use client";
import { StyledTagContainer } from "./style/tag-container-style";
import { useState } from "react";
import { MdArrowDropUp } from "react-icons/md";

export const TagContainer = () => {
	const [createTagContainer, setCreateTagContainer] = useState(false);
	const [tagValues, setTagValues] = useState({ name: "", color: "black" });

	const colors = {
		black: "#111111",
		red: "#913030",
		orange: "#a9592c",
		yellow: "#caa522",
		green: "#2a7e38",
		blue: "#124b80",
		purple: "#592a8e",
		pink: "#d76eaa",
	};

	const createTag = async () => {
		console.log({ tagValues });
	};

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
							<input value={tagValues.name} onChange={(e) => setTagValues({ ...tagValues, name: e.target.value })} role="tag-name" type="text" id="tag-name" placeholder="Importante, finalizado..." />
						</div>

						<div className="colors-field">
							<p className="text">Escolha uma cor para sua nova tag</p>
							<div className="colors">
								{Object.entries(colors).map(([colorName, colorCode]) => (
									<div role={colorName} key={colorName} className="color">
										<button onClick={() => setTagValues({ ...tagValues, color: colorName })} className={tagValues.color === colorName ? "active" : ""} style={{ backgroundColor: colorCode }} />
										{tagValues.color === colorName && <MdArrowDropUp className="icon" />}
									</div>
								))}
							</div>
						</div>

						<button className="submit" role="submit" onClick={() => createTag()}>
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
