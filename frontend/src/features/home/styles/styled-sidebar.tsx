"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSidebar = styled.div`
	grid-area: 1 / 1 / span 2 / 1;
	background-color: ${Palette.container};
	width: 300px;
	min-height: 100vh;
	padding: 1rem 2rem;

	.user {
		text-transform: capitalize;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid #222;
		font-size: 1.1rem;
	}

	.search-list {
		background-color: #222;
		margin: 2rem 0;
		width: 100%;
	}

	.list-container {
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

		.active {
			color: ${Palette.primary};
		}
	}

	.create-list {
		width: 100%;
		margin: 2rem 0;
	}
`;
