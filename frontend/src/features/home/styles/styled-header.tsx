"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledHeader = styled.header`
	grid-area: 1 / 2;
	margin: 1rem 2rem;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.active {
		.title {
			color: ${Palette.primary};
		}

		.tasks-length {
			color: ${Palette.text + "90"};
			font-size: 0.8rem;
		}
	}

	.right {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		max-width: 50vw;
		flex-grow: 1;

		.search-task {
			flex-grow: 1;
		}

		.configs {
			background-color: transparent;
			color: ${Palette.text + "90"};
			margin: 0 2rem;

			&:hover {
				background-color: ${Palette.container};
				color: ${Palette.text};
			}
		}
	}
`;
