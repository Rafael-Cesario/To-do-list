import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledMenu = styled.div`
	/* position: relative; */

	button {
		border: none;
	}

	.main {
		color: ${Palette.fadedText};
		margin-right: 1rem;

		&:hover {
			background-color: ${Palette.primary};
			color: #ddd;
		}

		&:focus {
			outline: 1px solid #ddd;
		}
	}

	.options {
		background-color: ${Palette.container};
		border-radius: ${Palette.borderRadius};
		margin-top: 8px;
		position: absolute;
		padding: 1rem;
		display: flex;
		flex-direction: column;

		.title {
			font-size: 1.1rem;
			margin-bottom: 1rem;
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
