import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledCreateList = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(18rem, -3rem);

	background-color: ${Palette.container};
	border: 2px solid ${Palette.borderContainer};
	border-radius: ${Palette.borderRadius};
	box-shadow: 0px 20px 10px #00000030;
	padding: 2rem;

	min-width: 300px;
	max-width: 500px;
	width: 50vw;

	animation: intro 0.3s ease-out;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.title {
			font-size: 1.3rem;
			margin-bottom: 2rem;
		}

		.close {
			font-size: 1.1rem;
			background-color: transparent;
			border: 2px solid transparent;
			padding: 5px 15px;
			transform: translateY(-50%);

			&:hover {
				background-color: ${Palette.errorText};
				color: #ddd;
			}
		}
	}

	.field {
		label {
			font-size: 0.8rem;
			color: ${Palette.fadedText};
		}

		input {
			background-color: ${Palette.background};
			font-weight: bold;
		}
	}

	.submit {
		width: 100%;
		background-color: ${Palette.primary};

		&:hover {
			background-color: ${Palette.fadedText};
		}
	}

	@keyframes intro {
		from {
            transform: translate(25rem, -3rem);
			opacity: 0;
		}
	}
`;
