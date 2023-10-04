"use client";
import { useRef, useState } from "react";
import { produce } from "immer";
import { ITagColors, TaskInput } from "@/services/interfaces/task";
import { tagColors } from "@/styles/palette";

interface Props {
	props: {
		task: TaskInput;
		setTask: (state: TaskInput) => void;
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

	const createTag = () => {
		if (!tag.name) return;

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

	const removeTag = (tagName: string) => {
		const state = produce(task, (draft) => {
			const tagIndex = draft.tags.findIndex((tag) => tag.name === tagName);
			draft.tags.splice(tagIndex, 1);
		});

		setTask(state);
	};

	return (
		<div className="field-tag">
			<h2 className="field-title">Tags</h2>

			<form onSubmit={(e) => e.preventDefault()}>
				<div className="colors">
					{Object.entries(tagColors).map(([key, color]) => (
						<button type="button" onClick={() => setTag({ ...tag, color: key as keyof ITagColors })} className="color" key={key} style={{ backgroundColor: color }} name={key} data-cy={key} />
					))}
				</div>

				<input
					ref={nameRef}
					value={tag.name}
					onChange={(e) => setTag({ ...tag, name: e.target.value.trim().toLowerCase() })}
					type="text"
					className="tag-name"
					placeholder="Nova tag"
					data-cy="input-tag"
				/>

				<button data-cy="create-tag" className="tag-create" onClick={() => createTag()}>
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

							<button className="remove-tag" onClick={() => removeTag(tag.name)}>
								x
							</button>
						</div>
					))}
			</div>
		</div>
	);
};
