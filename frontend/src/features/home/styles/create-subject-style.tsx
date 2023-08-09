"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateSubject = styled.div`
	margin: 0 2rem;
	display: flex;
	box-shadow: 10px 10px 10px #00000010;

	.name {
		margin-right: 1rem;
		max-width: 500px;
	}

	.submit {
		background-color: ${Palette.primary};
		border: 2px solid transparent;
		font-weight: bold;
		padding: 0 1rem;
	}
`;
