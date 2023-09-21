import { Palette } from "@/styles/palette";
import styled from "styled-components";
import { StyledListContainer } from "./styled-list-container";

export const StyledLoadingLists = styled(StyledListContainer)`
	.list {
		width: 100%;
		height: 1.5rem;
		background-color: #222;
		border-radius: ${Palette.borderRadius};
		opacity: 0;

		&:nth-child(1) {
			animation: lists 1.5s infinite;
		}

		&:nth-child(2) {
			animation: lists 1.5s 0.2s infinite;
		}

		&:nth-child(3) {
			animation: lists 1.5s 0.4s infinite;
		}
	}

	@keyframes lists {
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
