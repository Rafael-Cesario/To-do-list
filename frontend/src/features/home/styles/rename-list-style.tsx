import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledRenameList = styled.div`
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
		border: 2px solid ${Palette.primary};
		padding: 4rem;
		position: relative;
        max-width: 500px;

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
			color: ${Palette.primary};
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
			margin: 4rem 0;
		}

		.submit {
			background-color: ${Palette.primary};
			margin-top: 15rem;
		}
	}
`;
