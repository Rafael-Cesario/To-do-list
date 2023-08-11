"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledFilterSubject = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	max-width: 1000px;
	width: 90%;

	.searchbar {
		margin-bottom: 1rem;
	}

	.buttons {
		display: flex;

		button {
			border: 2px solid transparent;
			padding: 5px 10px;
			display: flex;
			align-items: center;
			margin-bottom: 2rem;
		}

		button:nth-child(1) {
			margin-right: 16px;
		}

		.sorted {
			margin: 0 12px;
			color: ${Palette.fadedText + "90"};
			width: 180px;
		}

		.icon {
			background-color: ${Palette.container};
			padding: 4px;
		}

		button:hover .sorted {
			color: #333;
		}
	}

	.dropdown {
		position: relative;

		.options {
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(-1rem, 3.5rem);
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 1rem;
			background-color: ${Palette.container};
			border: 1px solid ${Palette.borderContainer};
			border-radius: ${Palette.borderRadius};
			box-shadow: 10px 10px 10px #00000050;
			width: 100%;

			animation: show 0.2s ease-out;

			.sort {
				background-color: #444;
				color: #ddd;
				margin: 4px;
				padding: 10px 20px;
				text-align: center;
				justify-content: right;
			}

			.sort:hover,
			.active {
				background-color: ${Palette.primary};
				color: #ddd;
			}
		}
	}

	@keyframes show {
		from {
			opacity: 0;
			transform: translate(-1rem, 3rem);
		}
	}
`;
