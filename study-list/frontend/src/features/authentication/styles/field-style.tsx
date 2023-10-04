import { Palette } from "@/styles/palette";
import { styled } from "styled-components";

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;

	label {
		color: ${Palette.fadedText};
		font-weight: normal;
		font-size: 0.8rem;
	}

	.error-message {
		font-size: 0.8rem;
		color: ${Palette.errorText};
	}

	.input-password {
		display: flex;
		align-items: center;
		background-color: ${Palette.container};
		border: 2px solid ${Palette.borderContainer};
		border-radius: ${Palette.borderRadius};
		margin: 0.5rem 0;
		padding: 0 20px;

		&:focus-within {
			outline: 1px solid white;
		}

		input {
			border: none;
			padding: 10px 0;
			margin: 0;
			margin-right: 24px;
			outline: none;
		}

		.icon {
			cursor: pointer;
			opacity: 50%;

			&:hover {
				opacity: 1;
			}
		}
	}

	.error {
		border-left: 5px solid ${Palette.errorText};
	}

	.success {
		border-left: 5px solid ${Palette.successText};
	}
`;
