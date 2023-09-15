import { defaultUserData } from "@/app/@authentication/page";
import { validations } from "@/utils/validations";
import { produce } from "immer";

interface FieldProps {
	props: {
		label: string;
		placeholder: string;
		fieldName: keyof typeof defaultUserData;
		errors: typeof defaultUserData;
		userData: typeof defaultUserData;
		setErrors: (newState: typeof defaultUserData) => void;
		changeUserData: (key: keyof typeof defaultUserData, value: string) => void;
	};
}

export const Field = ({ props: { errors, setErrors, fieldName, label, changeUserData, userData, placeholder } }: FieldProps) => {
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
			<input
				id="email"
				type="text"
				placeholder={placeholder}
				value={userData[fieldName]}
				onChange={(e) => {
					changeUserData(fieldName, e.target.value);
					validateField(fieldName, e.target.value);
				}}
			/>
			<span className="error">{errors[fieldName]}</span>
		</div>
	);
};
