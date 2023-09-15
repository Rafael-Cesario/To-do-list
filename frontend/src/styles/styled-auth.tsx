"use client";
import styled from "styled-components";
import { Palette } from "./palette";

export const StyledAuth = styled.main`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 90vh;

	form {
		display: flex;
		flex-direction: column;
	}

	.title,
	.field-container {
		margin-bottom: 4rem;
	}

	.field,
	.submit {
		min-width: 200px;
		max-width: 400px;
		width: 100vw;
	}

	.field {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;

		.error {
			font-size: 0.8rem;
			margin: 0 1rem;
			color: ${Palette.error};
		}

		.input {
			display: flex;
			align-items: center;
			background-color: ${Palette.container};

			input {
				width: 100%;
			}

			.icon {
				margin: 0 1rem;
				cursor: pointer;
			}
		}

		label,
		.input {
			margin-bottom: 8px;
		}

		label {
			margin-left: 1rem;
			font-size: 0.8rem;
			color: ${Palette.text + "90"};
		}

		&:last-child {
			margin-bottom: 0;
		}
	}

	.submit {
		margin-bottom: 1rem;
	}

	.form {
		background-color: transparent;
		color: ${Palette.text + "50"};

		&:hover {
			color: ${Palette.text};
		}
	}
`;
