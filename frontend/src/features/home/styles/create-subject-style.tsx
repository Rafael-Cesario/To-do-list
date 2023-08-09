"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateSubject = styled.div`
	margin: 0 2rem;
	box-shadow: 10px 10px 10px #00000010;

	.create {
		display: flex;
	}

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

	.error,
	.success {
		font-size: 0.8rem;
		width: fit-content;
		color: #ddd;
		border-radius: ${Palette.borderRadius};
		overflow: hidden;

		.message {
			margin: 1rem 8px;
		}

		.close {
			border: 2px solid transparent;
			margin: 4px;
			margin-left: 1rem;
			background-color: #222;
			color: #ddd;
			font-size: 1rem;
			padding: 0 1rem;

			&:hover {
				background-color: #ddd;
				color: #222;
			}
		}
	}

	.error {
		background-color: ${Palette.errorText};
	}

	.success {
		background-color: ${Palette.successText};
	}
`;
