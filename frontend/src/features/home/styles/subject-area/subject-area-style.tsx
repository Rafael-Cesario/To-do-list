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
		max-width: 1000px;
		min-width: 400px;
		height: 97vh;
		background-color: ${Palette.container};
		padding: 1rem 2rem;
		overflow-y: scroll;

		.header {
			display: flex;
			justify-content: space-between;

			.title {
				text-transform: capitalize;
			}
		}

		.close {
			margin: 0 -1rem;
			border: none;
			color: ${Palette.fadedText};
			font-size: 1rem;

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
			}

			textarea {
				width: 100%;
				min-height: 100px;
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
	}
`;
