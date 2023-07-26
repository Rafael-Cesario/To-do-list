import styled from "styled-components";
import { Palette } from "@/styles/palette";

export const StyledNotification = styled.div<{ type: string }>`
	position: absolute;
	min-width: 20rem;
	min-height: 5rem;
	max-width: 30rem;
	margin: 0.5rem;
	z-index: 1;
	background-color: ${Palette.container};
	padding: 1rem 4rem 1rem 2rem;
	border-radius: ${Palette.borderRadius};
	border-left: 10px solid ${({ type }) => (type === "success" ? Palette.successText : Palette.errorText)};

	.title {
		font-size: 1.1rem;
	}

	.message {
		color: ${Palette.fadedText};
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0;
		background-color: transparent;
		border: none;

		&:hover {
			background-color: ${Palette.errorText};
			color: #ddd;
		}
	}
`;
