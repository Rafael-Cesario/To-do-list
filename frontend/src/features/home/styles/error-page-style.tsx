"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledErrorPage = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;

	.container {
		background-color: ${Palette.container};
		border: 2px solid ${Palette.borderContainer};
		border-radius: ${Palette.borderRadius};
		box-shadow: 10px 20px 10px #00000020;
		padding: 2rem;
		margin: 2rem;
		max-width: 500px;
	}

	.title {
		font-size: 1.3rem;
		margin-bottom: 1rem;
	}

	.message {
		color: ${Palette.fadedText};
		margin-bottom: 4rem;
	}

	.logout {
		width: 100%;
		background-color: ${Palette.primary};
	}
`;
