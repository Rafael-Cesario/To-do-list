import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledTagContainer = styled.div`
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			font-size: 1.5rem;
			margin: 8px;
		}

		.create-button {
			border: none;
			background-color: ${Palette.background};
			background-color: transparent;
			font-size: 1.5rem;
			padding: 10px 20px;
			margin: 8px;

			&:hover {
				background-color: #ddd;
				color: #222;
			}
		}
	}

	.create-tag-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #00000090;
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: center;
		align-items: center;

		.title {
			margin-bottom: 1rem;
		}

		.create-tag {
			background-color: #ddd;
			color: #222;
			border-radius: ${Palette.borderRadius};
			padding: 4rem 2rem;

			display: flex;
			flex-direction: column;
			align-items: center;

			.name {
				margin: 2rem 0;

				input {
					border: 2px solid transparent;
					outline: none;
				}

				input:focus {
					border: 2px solid #0b67df;
				}
			}

			.colors-field {
				margin-bottom: 4rem;

				.text {
					margin-bottom: 12px;
					text-align: center;
				}

				.colors button {
					margin: 2px;
					padding: 0;
					width: 30px;
					height: 30px;
					transition: 0.2s;
					border: none;
					outline: none;
					position: relative;

					&:focus {
						transform: scale(1.1);
					}

					&:hover {
						transform: scale(1.1);
					}
				}

				.active {

					&::after {
						content: "";
						position: absolute;
						transform: translateY(8px);
						left: 0;
						bottom: 0;
						width: 100%;
						height: 2px;
						background-color: #222;
					}
				}
			}

			.submit {
				width: 100%;
				background-color: ${Palette.primary};
				border: none;
				outline: none;

				&:hover {
					background-color: #222;
					color: #ddd;
				}
			}

			.cancel {
				margin: 1rem;
				background-color: transparent;
				width: 100%;
				color: #555;
				font-weight: bold;
				padding: 10px 20px;
				border: none;
				outline: none;

				&:hover {
					background-color: ${Palette.errorText};
					color: #ddd;
				}
			}
		}
	}
`;
