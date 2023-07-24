import Image from "next/image";
import { StyledField } from "../styles/field-style";

interface IPasswordField {
	name: string;
	label: string;
	placeholder: string;
}

export const PasswordField = ({ name, label, placeholder }: IPasswordField) => {
	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>

			<div className="input-password">
				<input type="password" id={name} placeholder={placeholder}/>
				<Image className="icon" alt="input-icon" src={"/icons/eye-closed.png"} width={20} height={20} />
			</div>
		</StyledField>
	);
};
