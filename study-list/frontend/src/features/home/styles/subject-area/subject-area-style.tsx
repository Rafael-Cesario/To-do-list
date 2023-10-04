"use client";
import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSubjectArea = styled.div`
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100vh;
	background-color: #00000080;
	backdrop-filter: blur(2px);
	display: flex;
	justify-content: flex-end;

	.container {
		margin: 1rem;
		border-radius: ${Palette.borderRadius};
		border: 2px solid ${Palette.borderContainer};
		width: 30vw;
		max-width: 400px;
		min-width: 400px;
		height: 97vh;
		background-color: ${Palette.container};
		padding: 1rem 2rem;
		overflow-y: scroll;

		.header {
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			margin-bottom: 8px;

			.title {
				text-transform: capitalize;
				font-size: 2rem;
				font-weight: bold;
				padding: 0;
				outline: none;
				width: fit-content;
				width: 100%;
				border: none;
				border-bottom: 2px solid ${Palette.primary};
				border-radius: 0;
			}
		}

		.close {
			border: none;
			font-size: 1rem;
			color: ${Palette.fadedText};
			background-color: ${Palette.background};

			&:hover {
				background-color: ${Palette.errorText};
				color: #ddd;
			}
		}

		.details {
			display: flex;
			justify-content: space-between;
			color: ${Palette.fadedText};
			font-size: 0.8rem;
		}

		.notes {
			margin: 4rem 0;

			.title {
				margin-bottom: 1rem;
				font-size: 1.5rem;
			}

			textarea {
				width: 100%;
				min-height: 200px;
				resize: vertical;
				padding: 1rem;
				background-color: ${Palette.background};
				border: 2px solid ${Palette.borderContainer};
				box-shadow: 2px 2px 2px #00000050;
				color: #aaa;

				&:focus {
					outline: 2px solid ${Palette.primary};
				}
			}
		}

		.buttons {
			display: flex;
			justify-content: space-between;
			margin-top: 8rem;

			.delete {
				margin-right: 1rem;
				background-color: ${Palette.errorText};
			}

			.save {
				background-color: ${Palette.primary};
				width: 100%;
			}

			.delete,
			.save {
				flex-grow: 1;
				border: none;
				transition: 0.1s;

				&:hover {
					background-color: ${Palette.text};
					color: ${Palette.background};
				}
			}
		}
	}
`;
