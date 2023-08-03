import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;

	li {
		color: ${Palette.fadedText};
		position: relative;
		padding: 8px 0 4px 1rem;
		border-bottom: 2px solid ${Palette.fadedText + "10"};
		font-weight: bold;
		font-size: 0.9rem;
		cursor: pointer;

		&:hover {
			background-color: ${Palette.borderContainer};
		}

		&::before {
			content: "";
			position: absolute;
			top: 12px;
			left: 0;
			width: 5px;
			height: 15px;
			background-color: ${Palette.fadedText};
		}
	}

	.active::before {
		background-color: ${Palette.primary};
	}
`;
