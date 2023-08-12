"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSidebar = styled.div`
	margin: 8px;
	border-radius: 4px;
	background-color: ${Palette.container};
	border: 1px solid #222;
	box-shadow: 10px 0 10px #00000030;
	min-width: 350px;
	min-height: 100vh;
	padding: 1rem 2rem;
	z-index: 1;

	grid-column: 1 / 1;
	grid-row: 1 / 3;

	animation: show 0.3s ease-out both;

	.header {
		margin-bottom: 5rem;
		display: flex;
		justify-content: space-between;

		.close {
			border: none;
			padding: 0;
			margin: 0;
			font-size: 1.3rem;
			padding: 0 1rem;
			color: #555;

			&:hover {
				background-color: ${Palette.errorText};
				color: #ddd;
			}
		}
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

	@keyframes show {
		from {
			transform: translate(-100%, 0vh);
		}
	}
`;

export const StyledCloseSidebar = styled.div`
	position: fixed;
	top: 2vh;
	left: 0;
	margin: 0;

	.open {
		padding: 10px 20px;
		border: 2px solid ${Palette.primary};
		border-left: none;
		font-size: 1rem;
		border-radius: 0 4px 4px 0;
		background-color: ${Palette.primary};
		height: 100px;
		transition: 0.2s;

		&:hover {
			padding: 10px 40px;
		}
	}
`;
