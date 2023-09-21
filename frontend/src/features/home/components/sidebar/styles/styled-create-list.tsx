import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateList = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: #00000050;
	backdrop-filter: blur(4px);
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		background-color: ${Palette.container};
		border: 1px solid ${Palette.primary};
		border-radius: ${Palette.borderRadius};
		padding: 4rem;
		box-shadow: 2px 2px 2px #00000020;
		position: relative;
		width: 100%;
		max-width: 400px;

		display: flex;
		flex-direction: column;
		align-items: center;

		.close {
			position: absolute;
			top: 0;
			right: 0;
			margin: 1rem;
			background-color: transparent;
			color: ${Palette.text + "50"};
			font-size: 1rem;

			&:hover {
				background-color: ${Palette.error};
				color: #eee;
			}
		}

		.field {
			margin: 4rem 0;
			display: flex;
			flex-direction: column;
			width: 100%;

			label {
				font-size: 0.8rem;
				font-weight: normal;
				color: ${Palette.text + "90"};
			}

			input {
				background-color: #222;
				margin: 8px 0;
			}

			.error {
				color: ${Palette.error};
				font-size: 0.9rem;
				margin-left: 4px;
			}
		}

		.submit {
			width: 100%;
			font-size: 1rem;

			&:hover {
				background-color: ${Palette.primary + "90"};
			}
		}
	}
`;
