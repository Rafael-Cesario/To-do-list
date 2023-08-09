import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledMenu = styled.div`
	.main {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0 1rem;
		text-align: right;
		color: ${Palette.fadedText};
		border-radius: 2px;
		padding: 4px 12px;

		&:hover {
			background-color: ${Palette.primary};
			color: #ddd;
		}

		&:focus {
			outline: 1px solid #ddd;
		}
	}

	.options {
		transform: translateY(2rem);
		position: absolute;
		width: 100%;
		right: 0;
		top: 0;

		margin-top: 8px;
		padding: 1rem;
		z-index: 1;

		display: flex;
		flex-direction: column;

		background-color: ${Palette.container};
		border-radius: ${Palette.borderRadius};
		border: 4px solid ${Palette.borderContainer};
		box-shadow: 8px 8px 4px #00000020;

		.title {
			font-size: 1.1rem;
			margin-bottom: 1rem;
			text-align: left;
		}

		.rename {
			background-color: ${Palette.primary};
			min-width: 200px;
		}

		.delete {
			background-color: ${Palette.errorText};
			min-width: 200px;
		}

		.rename:hover,
		.delete:hover {
			background-color: ${Palette.background};
			color: #ddd;
		}
	}
`;
