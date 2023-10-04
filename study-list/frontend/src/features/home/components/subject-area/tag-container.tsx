"use client";
import { Store } from "@/context/store";
import { StyledTagContainer } from "./style/tag-container-style";
import { useState } from "react";
import { FaRegHandPointer } from "react-icons/fa";
import { useSelector } from "react-redux";

export const TagContainer = () => {
	const [createTagContainer, setCreateTagContainer] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [tagValues, setTagValues] = useState({ name: "", color: "black" });
	const { tags, userID } = useSelector((state: Store) => state.tags);

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
		if (!tagValues.name) return setFeedback("Sua tag precisa de um nome");
		setFeedback("");
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

							{feedback && (
								<p role="feedback" className="error">
									{feedback}
								</p>
							)}

							<input
								style={{ backgroundColor: colors[tagValues.color as keyof typeof colors] }}
								value={tagValues.name}
								onChange={(e) => setTagValues({ ...tagValues, name: e.target.value })}
								role="tag-name"
								type="text"
								id="tag-name"
								placeholder="Importante, finalizado..."
							/>
						</div>

						<div className="colors-field">
							<p className="text">Escolha uma cor para sua nova tag</p>
							<div className="colors">
								{Object.entries(colors).map(([colorName, colorCode]) => (
									<div role={colorName} key={colorName} className="color">
										<button onClick={() => setTagValues({ ...tagValues, color: colorName })} className={tagValues.color === colorName ? "active" : ""} style={{ backgroundColor: colorCode }} />
										{tagValues.color === colorName && <FaRegHandPointer className="icon" />}
									</div>
								))}
							</div>
						</div>

						<button className="submit" role="submit" onClick={() => createTag()}>
							Criar minha tag
						</button>

						<button role="close-tag-container" onClick={() => setCreateTagContainer(false)} className="cancel">
							Fechar
						</button>
					</div>
				</div>
			)}
		</StyledTagContainer>
	);
};
