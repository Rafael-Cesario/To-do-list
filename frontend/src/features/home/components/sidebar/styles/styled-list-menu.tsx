import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListMenu = styled.div`
	background-color: #00000050;
	backdrop-filter: blur(10px);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		background-color: ${Palette.container};
		border-radius: ${Palette.borderRadius};
		border: 1px solid ${Palette.primary};
		padding: 4rem;
		position: relative;
		width: 50vw;
		max-width: 500px;
		min-width: 300px;

		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			margin-bottom: 2rem;
		}

		.data {
			display: flex;
			flex-direction: column;
			width: 100%;

			label {
				font-size: 0.8rem;
				color: ${Palette.text + "80"};
				margin: 4px;
			}

			#name {
				background-color: #222;
			}

			.error {
				margin: 8px;
				margin-bottom: 3rem;
				font-size: 0.8rem;
				color: ${Palette.error};
			}
		}

		.buttons {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;

			.delete {
				background-color: ${Palette.error};
			}

			.save,
			.delete {
				width: 45%;
			}
		}

		.close {
			position: absolute;
			margin: 1rem;
			font-size: 1rem;
			background-color: transparent;
			color: ${Palette.text + "50"};
			top: 0;
			right: 0;

			&:hover {
				background-color: ${Palette.error};
				color: #eee;
			}
		}
	}

	.delete-list {
		border-radius: ${Palette.borderRadius};
		border: 1px solid ${Palette.error};
		background-color: #111;
		box-shadow: 10px 10px 10px #00000030;
		margin-top: 2rem;
		width: 100%;
		text-align: center;
		padding: 2rem;

		.text {
			margin-bottom: 1rem;
		}

		button {
			margin: 1rem 0;
			background-color: #aaa;
			color: #111;
			width: 48%;

			&:hover {
				background-color: #222;
				color: #ddd;
			}
		}
	}
`;
