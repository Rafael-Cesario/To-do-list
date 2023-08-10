"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateSubject = styled.div`
	width: 90%;
	margin-bottom: 1rem;
	max-width: 1000px;
	box-shadow: 10px 10px 10px #00000010;

	.create {
		display: flex;
	}

	.name {
		margin-right: 1rem;
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
		display: flex;

		.message {
			margin: 1rem 8px;
			font-weight: bold;
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

	.loading-button {
		padding: 10px 20px;
		border: 2px solid #222;
		height: 2.5rem;
	}
`;
