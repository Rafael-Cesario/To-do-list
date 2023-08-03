"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem 2rem;

	.title h1 {
		text-transform: capitalize;
	}

	.title p {
		color: ${Palette.fadedText};
		font-size: 0.8rem;
	}

	.menu {
		display: flex;
		height: fit-content;

		input {
			width: 30vw;
			max-width: 400px;
		}
	}
`;
