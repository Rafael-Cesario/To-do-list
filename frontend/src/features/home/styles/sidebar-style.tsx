"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSidebar = styled.div`
	min-height: 100vh;
	background-color: ${Palette.container};
	padding: 1rem 2rem;
	border-right: 5px solid ${Palette.borderContainer};

	.title {
		margin-bottom: 5rem;
	}

	.search {
		background-color: ${Palette.background};
		width: 100%;
		margin-bottom: 2rem;
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;

		.icon {
			font-size: 1.4rem;
			padding: 5px 10px;
			border: none;

			&:hover {
				background-color: ${Palette.container};
				outline: 2px solid ${Palette.primary};
				color: #ddd;
			}
		}
	}

	.list-container {
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
	}
`;
