import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;
	margin-top: 1rem;

	.container {
		position: relative;
		cursor: pointer;
		border: 2px solid ${Palette.fadedText + "10"};
		opacity: 0.7;
		background-color: #111;
		box-shadow: 2px 2px 2px #00000030;
		padding: 4px 12px;
		border-radius: ${Palette.borderRadius};
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
		background-color: #20509070;
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
