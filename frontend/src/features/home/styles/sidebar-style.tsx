"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSidebar = styled.div`
	min-width: 350px;
	min-height: 100vh;
	background-color: ${Palette.container};
	padding: 1rem 2rem;
	box-shadow: 4px 0 10px #00000020;

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

	@media (max-width: 1000px) {
		position: absolute;
	}
`;
