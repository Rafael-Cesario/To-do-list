"use client";

import { styled } from "styled-components";
import { Palette } from "./palette";

export const StyledAuthentication = styled.main`
	.line {
		top: 0;
		left: 0;
		width: 100%;
		position: absolute;
		background-color: ${Palette.primary};
		height: 10px;
	}

	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 90vh;
`;
