import styled from "styled-components";
import { Palette } from "@/styles/palette";

export const StyledNotification = styled.div<{ type: string }>`
	position: absolute;
	right: 0;
	min-width: 25rem;
	min-height: 5rem;
	max-width: 30rem;
	margin: 0.5rem;
	z-index: 1;
	background-color: ${Palette.container};
	padding: 1rem 4rem 1rem 2rem;
	border-radius: ${Palette.borderRadius};
	box-shadow: 0 10px 5px #00000020;
	border-left: 1rem solid ${({ type }) => (type === "success" ? Palette.successText : Palette.errorText)};

	.title {
		color: ${({ type }) => (type === "success" ? Palette.successText : Palette.errorText)};
		font-size: 1.2rem;
	}

	.message {
		margin: 4px 0;
		font-size: 0.9rem;
		color: #ddd;
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
