"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSidebar = styled.div`
	min-width: 15vw;
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
		position: relative;

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
`;
