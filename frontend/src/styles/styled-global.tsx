"use client";
import * as styled from "styled-components";
import { Palette } from "./palette";

export const StyledGlobal = styled.createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${Palette.background};
		color: ${Palette.text};
	}

	input,
	button {
		border-radius: ${Palette.borderRadius};
		color: ${Palette.text};
		padding: 12px 16px;
		border: none;

		&:focus {
			outline: 2px solid ${Palette.primary};
		}
	}

	input {
		background-color: ${Palette.container};
	}

	button {
		background-color: ${Palette.primary};
		cursor: pointer;
		transition: 0.3s;
		font-weight: bold;

		&:active {
			transform: scale(0.95);
		}
	}
`;
