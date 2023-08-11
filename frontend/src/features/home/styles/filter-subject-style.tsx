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

	.filters {
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

		.current-filter {
			margin: 0 12px;
			color: ${Palette.fadedText + "90"};
		}

		.icon {
			background-color: ${Palette.container};
			padding: 4px;
		}

		button:hover .current-filter {
			color: #333;
		}
	}

	.dropdown {
		position: relative;

		.options {
			position: absolute;
			top: 0;
			right: 0;
			margin: 4rem 1rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 1rem;
			background-color: ${Palette.container};
			border: 1px solid ${Palette.borderContainer};
			border-radius: ${Palette.borderRadius};

			.filter {
				background-color: #111;
				margin: 4px;
				padding: 10px 20px;

				&:hover,
				.active {
					background-color: ${Palette.primary};
					color: #ddd;
				}
			}
		}
	}
`;
