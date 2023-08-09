import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;

	.container {
		position: relative;
		border-bottom: 2px solid ${Palette.fadedText + "10"};
		padding: 4px 0 4px 1rem;
		cursor: pointer;

		&:hover {
			background-color: ${Palette.borderContainer};
		}
	}

	li {
		color: ${Palette.fadedText + "80"};
		font-weight: bold;
		font-size: 0.9rem;
		text-transform: capitalize;
		width: 100%;

		&::before {
			content: "";
			position: absolute;
			top: 4px;
			left: 0;
			width: 5px;
			height: 70%;
			background-color: ${Palette.fadedText + "50"};
		}
	}

	.options {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0 1rem;
		text-align: right;
		color: ${Palette.fadedText};
		border-radius: 2px;
		padding: 4px;

		&:hover {
			color: ${Palette.text};
		}
	}

	.subjects-counter {
		color: ${Palette.fadedText};
		font-size: 0.9rem;
		background-color: ${Palette.primary};
		padding: 0 4px;
		border-radius: 1px;
		color: #ddd;
		margin: 0 8px;
	}

	.active {
		color: #ddd;
	}

	.active::before {
		background-color: ${Palette.primary};
	}
`;
