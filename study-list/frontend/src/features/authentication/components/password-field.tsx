import Image from "next/image";
import { StyledField } from "../styles/field-style";
import { useState } from "react";

interface IPasswordField {
	name: string;
	label: string;
	placeholder: string;
	customClass: string;
	error: string;
	// eslint-disable-next-line no-unused-vars
	updateValue: (newState: string, name: string) => void;
}

export const PasswordField = ({ name, label, placeholder, customClass, error, updateValue }: IPasswordField) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>

			<div className={"input-password " + customClass}>
				<input role={name} id={name} placeholder={placeholder} type={showPassword ? "text" : "password"} onChange={(e) => updateValue(e.target.value, name)} />

				{showPassword || (
					<Image
						onClick={() => setShowPassword(!showPassword)}
						className="icon"
						alt="input-icon"
						src={"/icons/eye-closed.png"}
						width={20}
						height={20}
					/>
				)}

				{showPassword && (
					<Image
						onClick={() => setShowPassword(!showPassword)}
						className="icon"
						alt="input-icon"
						src={"/icons/eye-open.png"}
						width={20}
						height={20}
					/>
				)}
			</div>

			<span className="error-message">{error}</span>
		</StyledField>
	);
};
