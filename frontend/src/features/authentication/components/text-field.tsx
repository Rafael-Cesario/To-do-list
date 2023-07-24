import { StyledField } from "../styles/field-style";

interface ITextField {
	name: string;
	label: string;
	placeholder: string;
}

export const TextField = ({ name, label, placeholder }: ITextField) => {
	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>
			<input type="text" id={name} autoComplete="false" placeholder={placeholder} />
		</StyledField>
	);
};
