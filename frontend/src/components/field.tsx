"use client";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface FieldProps<TypeUserData> {
	props: {
		label: string;
		value: string;
		error: string;
		placeholder: string;
		type: "text" | "password";
		key: string;
		fieldName: keyof TypeUserData;
		changeUserData: (fieldName: keyof TypeUserData, value: string) => void;
		validateField?: (fieldName: keyof TypeUserData, value: string) => void;
	};
}

export const Field = <TypeUserData,>({ props: { fieldName, label, placeholder, type, value, error, key, changeUserData, validateField } }: FieldProps<TypeUserData>) => {
	const [inputType, setInputType] = useState(type);

	return (
		<div className="field">
			<label htmlFor={key}>{label}</label>

			<div className="input">
				<input
					data-cy={key + "-input"}
					id={key}
					type={inputType}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						changeUserData(fieldName, e.target.value);
						validateField && validateField(fieldName, e.target.value);
					}}
				/>

				{inputType === "password" && <AiFillEyeInvisible data-cy={key + "-hide"} className="icon" onClick={() => setInputType("text")} />}
				{type === "password" && inputType === "text" && <AiFillEye data-cy={key + "-show"} className="icon" onClick={() => setInputType("password")} />}
			</div>

			<span className="error" data-cy={key + "-error"}>
				{error}
			</span>
		</div>
	);
};
