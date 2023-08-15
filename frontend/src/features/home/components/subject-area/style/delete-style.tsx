import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledDelete = styled.div`
	.container-delete-subject {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: #00000050;
		backdrop-filter: blur(2px);

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.confirmation {
		max-width: 400px;
		padding: 4rem;
		background-color: ${Palette.background};
		border-radius: ${Palette.borderRadius};
		border: 1px solid #333;
		box-shadow: 10px 10px 10px #00000030;
		text-align: center;

		.options {
			display: flex;
			justify-content: space-between;

			button:nth-child(1) {
				background-color: ${Palette.primary};
				margin-right: 8px;
			}

			button:nth-child(2) {
				background-color: ${Palette.errorText};
			}

			button {
				border: none;
				padding: 10px 20px;
				width: 100%;
				margin-top: 3rem;

				&:hover {
					background-color: #ddd;
					color: #222;
				}
			}
		}
	}
`;
