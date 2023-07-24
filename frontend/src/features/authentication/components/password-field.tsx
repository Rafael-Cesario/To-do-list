import Image from "next/image";
import { StyledField } from "../styles/field-style";
import { useState } from "react";

interface IPasswordField {
	name: string;
	label: string;
	placeholder: string;
}

export const PasswordField = ({ name, label, placeholder }: IPasswordField) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledField>
			<label htmlFor={name}>{label}</label>

			<div className="input-password">
				<input type={showPassword ? "text" : "password"} id={name} placeholder={placeholder} />

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
		</StyledField>
	);
};
