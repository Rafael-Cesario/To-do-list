import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;

	.container {
		position: relative;
		cursor: pointer;
		padding: 4px 8px;
		border-bottom: 2px solid ${Palette.fadedText + "10"};
		border-left: 4px solid transparent;
		opacity: 0.7;
	}

	li {
		color: ${Palette.fadedText};
		font-weight: bold;
		font-size: 0.9rem;
		text-transform: capitalize;
		width: 100%;
	}

	.subjects-counter {
		color: ${Palette.fadedText};
		font-size: 0.9rem;
		background-color: ${Palette.borderContainer};
		padding: 0 4px;
		border-radius: 1px;
		color: ${Palette.fadedText};
		margin: 0 8px;
		font-weight: bold;
	}

	.active,
	.container:hover {
		border-left: 4px solid #005090;
		border-radius: 0;
		opacity: 1;

		li {
			color: #ddd;
		}

		.main {
			background-color: ${Palette.fadedText};
			color: #111;
		}

		.subjects-counter {
			background-color: ${Palette.fadedText};
			color: #111;
		}
	}
`;
