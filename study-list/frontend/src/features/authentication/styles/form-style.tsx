import { Palette } from "@/styles/palette";
import { styled } from "styled-components";

export const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		margin-bottom: 2rem;
	}

	.fields {
		display: flex;
		flex-direction: column;
	}

	.submit {
		background-color: ${Palette.primary};
		border: none;

		&:hover {
			background-color: ${Palette.text};
		}
	}

	.change-form {
		background-color: transparent;
		border: none;
		color: ${Palette.fadedText};
		font-weight: normal;
		margin: 0;
	}
`;
