"use client";
import { useRef, useState } from "react";
import { ITagColors, ITaskValues } from "../create-task";
import { produce } from "immer";

interface Props {
	props: {
		task: ITaskValues;
		setTask: (state: ITaskValues) => void;
	};
}

const defaultTagValue: { name: string; color: keyof ITagColors } = {
	name: "",
	color: "gray",
};

export const TaskTag = ({ props: { task, setTask } }: Props) => {
	const [tag, setTag] = useState(defaultTagValue);
	const [error, setError] = useState("");
	const nameRef = useRef<HTMLInputElement>(null);

	const hasTags = task.tags.length > 0;

	const tagColors: ITagColors = {
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

	const createTag = () => {
		if (!tag.name) return;

		console.log("tags", task.tags);

		const isDuplicated = task.tags.find((taskTag) => taskTag.name === tag.name);
		if (isDuplicated) return setError("Uma tag com o mesmo nome já existe.");
		setError("");

		const state = produce(task, (draft) => {
			draft.tags.push(tag);
		});

		setTask(state);
		setTag(defaultTagValue);
		nameRef.current?.focus();
	};

	return (
		<div className="field-tag">
			<h2 className="field-title">Tags</h2>

			<form onSubmit={(e) => e.preventDefault()}>
				<div className="colors">
					{Object.entries(tagColors).map(([key, color]) => (
						<button type="button" onClick={() => setTag({ ...tag, color: key as keyof ITagColors })} className="color" key={key} style={{ backgroundColor: color }} name={key} />
					))}
				</div>

				<input ref={nameRef} value={tag.name} onChange={(e) => setTag({ ...tag, name: e.target.value.trim().toLowerCase() })} type="text" className="tag-name" placeholder="Nova tag" />

				<button className="tag-create" onClick={() => createTag()}>
					+
				</button>

				<p className="error">{error}</p>
			</form>

			<div className="tag-container">
				{hasTags || <p className="empty-tags">Nenhuma tag adicionada a esta tarefa</p>}
				{hasTags &&
					task.tags.map((tag) => (
						<div className="tag" key={tag.name} style={{ backgroundColor: tagColors[tag.color] }}>
							<p className="name">{tag.name}</p>
							<button className="remove-tag">x</button>
						</div>
					))}
			</div>
		</div>
	);
};
