"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledHeader = styled.div`
	display: flex;
	justify-content: center;
	padding: 1rem 2rem;
	margin-bottom: 3rem;

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
