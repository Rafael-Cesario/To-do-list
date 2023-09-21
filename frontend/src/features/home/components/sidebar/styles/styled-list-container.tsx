import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style-position: inside;

	.list {
		display: flex;
		justify-content: space-between;
		margin: 12px 0;
		color: ${Palette.text + "90"};
		font-weight: bold;
		cursor: pointer;

		.task-amount {
			background-color: #222;
			padding: 4px;
			border-radius: ${Palette.borderRadius};
			font-size: 0.8rem;
		}

		&:hover {
			color: ${Palette.primary};
		}
	}

	.empty-lists {
		font-size: 0.8rem;
		color: ${Palette.text + "50"};
	}

	.active {
		color: ${Palette.primary};
	}
`;
