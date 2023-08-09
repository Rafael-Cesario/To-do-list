import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;

	.container {
		position: relative;
		border-bottom: 2px solid ${Palette.fadedText + "10"};
		padding: 2px 8px;
		cursor: pointer;
		border-radius: ${Palette.borderRadius};

		&:hover {
			background-color: ${Palette.primary};
		}
	}

	li {
		color: ${Palette.fadedText + "80"};
		font-weight: bold;
		font-size: 0.9rem;
		text-transform: capitalize;
		width: 100%;
	}

	.subjects-counter {
		color: ${Palette.fadedText};
		font-size: 0.9rem;
		background-color: ${Palette.primary};
		padding: 0 4px;
		border-radius: 1px;
		color: ${Palette.fadedText};
		margin: 0 8px;
	}

	.active {
		background-color: ${Palette.primary};

		li {
			color: #ddd;
		}
	}
`;
