import { StyledField } from "../styles/field-style";

interface ITextField {
	name: string;
	label: string;
	placeholder: string;
	customClass: string;
	error: string;
	updateValue: (newValue: string, name: string) => void;
}

export const TextField = ({ name, label, placeholder, customClass, error, updateValue }: ITextField) => {
	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<input
				className={customClass}
				onChange={(e) => updateValue(e.target.value, name)}
				type="text"
				id={name}
				autoComplete="false"
				placeholder={placeholder}
				role={name}
			/>
			<span role={name + "-error"} className="error-message">
				{error}
			</span>
		</StyledField>
	);
};
