import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListContainer = styled.ul`
	list-style-position: inside;

	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 12px 0;
		color: ${Palette.text + "90"};
		font-weight: bold;
		cursor: pointer;

		.side {
			display: flex;
			align-items: center;
		}

		.task-amount {
			background-color: #222;
			padding: 4px 8px;
			border-radius: ${Palette.borderRadius};
			font-size: 0.8rem;
			margin-right: 1rem;
		}

		.list-menu {
			background-color: transparent;
			color: ${Palette.text + "80"};
			font-size: 1.2rem;
			padding: 0;
			margin: 0;
			margin-top: 4px;
		}

		&:hover,
		.list-menu:hover {
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
