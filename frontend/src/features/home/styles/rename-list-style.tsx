import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledListOption = styled.div<{ type: string }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #11111190;
	backdrop-filter: blur(2px);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.container {
		display: flex;
		flex-direction: column;
		background-color: ${Palette.container};
		border: 2px solid ${({ type }) => (type === "rename" ? Palette.primary : Palette.errorText)};
		padding: 4rem;
		position: relative;
		max-width: 500px;
		border-radius: ${Palette.borderRadius};

		.close {
			position: absolute;
			top: 0;
			right: 0;
			margin: 0;
			color: ${Palette.fadedText};

			&:hover {
				background-color: ${Palette.errorText};
				color: #ddd;
			}
		}

		.title {
			color: ${({ type }) => (type === "rename" ? Palette.primary : Palette.errorText)};
			text-align: center;
			margin-bottom: 1rem;
		}

		.description {
			color: ${Palette.fadedText};
			margin-bottom: 1rem;
		}

		.list-name {
			width: 100%;
			background-color: ${Palette.background};
		}

		.submit {
			background-color: ${({ type }) => (type === "rename" ? Palette.primary : Palette.errorText)};
			margin-top: 15rem;

			&:hover {
				background-color: ${Palette.background};
				color: #ddd;
			}
		}
	}
`;
