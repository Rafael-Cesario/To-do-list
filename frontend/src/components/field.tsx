"use client";
import { defaultUserData } from "@/app/@authentication/page";
import { validations } from "@/utils/validations";
import { produce } from "immer";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface FieldProps {
	props: {
		label: string;
		placeholder: string;
		type: "text" | "password";
		fieldName: keyof typeof defaultUserData;
		errors: typeof defaultUserData;
		userData: typeof defaultUserData;
		setErrors: (newState: typeof defaultUserData) => void;
		changeUserData: (key: keyof typeof defaultUserData, value: string) => void;
	};
}

export const Field = ({ props: { errors, setErrors, fieldName, label, changeUserData, userData, placeholder, type } }: FieldProps) => {
	const [inputType, setInputType] = useState(type);

	const validateField = (field: keyof typeof errors, value: string) => {
		const error = validations[field](value, userData.password);
		const newErrors = produce(errors, (draft) => {
			draft[field] = error;
		});
		setErrors(newErrors);
	};

	return (
		<div className="field">
			<label htmlFor={fieldName}>{label}</label>

			<div className="input">
				<input
					id="email"
					type={inputType}
					placeholder={placeholder}
					value={userData[fieldName]}
					onChange={(e) => {
						changeUserData(fieldName, e.target.value);
						validateField(fieldName, e.target.value);
					}}
				/>

				{inputType === "password" && <AiFillEyeInvisible className="icon" onClick={() => setInputType("text")} />}
				{type === "password" && inputType === "text" && <AiFillEye className="icon" onClick={() => setInputType("password")} />}
			</div>

			<span className="error">{errors[fieldName]}</span>
		</div>
	);
};
