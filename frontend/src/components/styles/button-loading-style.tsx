import { styled } from "styled-components";

export const StyledButtonLoading = styled.button`
	display: flex;
	justify-content: center;
	height: 2.2rem;

	span {
		transform: translateY(-2rem);
		margin: 0 5px;
		font-size: 3rem;
		opacity: 0;
	}

	span,
	:nth-child(1) {
		animation: loading 1s infinite;
	}

	span,
	:nth-child(2) {
		animation: loading 1s 0.2s infinite;
	}

	span,
	:nth-child(3) {
		animation: loading 1s 0.4s infinite;
	}

	@keyframes loading {
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
