import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateTask = styled.div`
	background-color: #00000050;
	backdrop-filter: blur(2px);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;

	.container {
		background-color: ${Palette.container};
		border-radius: ${Palette.borderRadius};
		box-shadow: 10px 10px 10px #00000030;
		position: relative;
		padding: 4rem;
		margin: 4rem;
		min-width: 300px;
		max-width: 600px;
		width: 100%;
		height: fit-content;

		.title {
			text-align: center;
			margin-bottom: 4rem;
			font-size: 1.5rem;
		}

		.field-title {
			font-size: 1rem;
			font-weight: bold;
			margin-bottom: 1rem;
		}

		.field-name,
		.field-description,
		.field-status,
		.field-tag {
			margin-bottom: 4rem;
		}

		.field-name {
			display: flex;
			flex-direction: column;

			#name {
				background-color: ${Palette.insideContainer};
			}

			.error {
				font-size: 0.8rem;
				margin: 0 1rem;
				color: ${Palette.error};
			}
		}

		.field-description {
			display: flex;
			flex-direction: column;

			#description {
				background-color: ${Palette.insideContainer};
				border-radius: ${Palette.borderRadius};
				padding: 1rem;
				border: none;
				resize: none;
				min-height: 20rem;
				color: ${Palette.text};

				&::-webkit-scrollbar {
					background-color: #333;
				}

				&::-webkit-scrollbar-thumb {
					background-color: #aaa;
					border-radius: ${Palette.borderRadius};
				}

				&:focus {
					outline: 2px solid ${Palette.primary};
				}
			}
		}

		.field-status {
			.next,
			.current,
			.done {
				width: 120px;
				height: 30px;
				margin: 8px;
				padding: 0;
				opacity: 0.5;
			}

			.next {
				background-color: ${Palette.insideContainer};
			}

			.current {
				background-color: ${Palette.primary};
			}

			.done {
				background-color: ${Palette.success};
			}

			.active {
				opacity: 1;
				position: relative;
			}
		}

		.field-tag {
			.color {
				padding: 13px;
				margin-right: 4px;
				margin-bottom: 1rem;
			}

			.tag-name {
				background-color: ${Palette.insideContainer};
				margin: 0 1rem 1rem 0;
				max-width: 300px;
				width: 100%;
			}

			.tag-create {
				font-size: 1.2rem;
				padding: 6px 12px;
			}

			.tag-container {
				display: flex;
				flex-wrap: wrap;
				margin: 1rem 0;

				.tag {
					border-radius: ${Palette.borderRadius};
					padding: 4px 8px;

					.remove-tag {
						border-left: 2px solid white;
						background-color: transparent;
						margin-left: 8px;
						padding: 0 8px;
						font-size: 1rem;
					}
				}
			}
		}

		.submit-task {
			margin: 2rem 0;
			width: 100%;
			font-size: 1rem;
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;
			margin: 2rem;
			background-color: transparent;
			color: ${Palette.text + "50"};
			font-size: 1rem;

			&:hover {
				background-color: ${Palette.error};
				color: #ddd;
			}
		}
	}
`;