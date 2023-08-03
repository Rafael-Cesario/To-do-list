import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style: none;

	li {
		margin-bottom: 8px;
		color: ${Palette.fadedText};
		position: relative;
		padding: 0rem 0 5px 1rem;
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
			top: 4px;
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
