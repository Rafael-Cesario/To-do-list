import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledLoadingButton = styled.button`
	background-color: ${Palette.container};
	pointer-events: none;

	span {
		margin: 4px;
		opacity: 0;

		&:nth-child(1) {
			animation: loadingDots 1s infinite;
		}

		&:nth-child(2) {
			animation: loadingDots 1s 0.1s infinite;
		}

		&:nth-child(3) {
			animation: loadingDots 1s 0.2s infinite;
		}
	}

	@keyframes loadingDots {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;
