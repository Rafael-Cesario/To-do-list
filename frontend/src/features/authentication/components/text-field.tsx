import { produce } from "immer";
import { StyledField } from "../styles/field-style";

interface IFormValues {
	email: string;
	name?: string;
	password: string;
	passwordConfirmation?: string;
}

interface ITextField {
	name: keyof IFormValues;
	label: string;
	placeholder: string;
	props: {
		values: IFormValues;
		errors: IFormValues;
		setValues: (newState: IFormValues) => void;
	};
}

export const TextField = ({ name, label, placeholder, props: { values, setValues, errors } }: ITextField) => {
	const updateValue = (newValue: string) => {
		const newState = produce(values, (draft) => {
			draft[name] = newValue;
		});
		setValues(newState);
	};

	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<input
				className={errors[name] ? "error" : values[name] ? "success" : ""}
				onChange={(e) => updateValue(e.target.value)}
				type="text"
				id={name}
				autoComplete="false"
				placeholder={placeholder}
			/>
			<span className="error-message">{errors[name]}</span>
		</StyledField>
	);
};
