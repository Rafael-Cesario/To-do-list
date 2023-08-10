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
`;
