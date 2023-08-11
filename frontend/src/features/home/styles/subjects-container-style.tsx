import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSubjectsContainer = styled.div`
	width: 90%;
	max-width: 1000px;

	.subject {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background-color: ${Palette.container};
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
		border-radius: ${Palette.borderRadius};
		border-left: 1px solid transparent;
		transition: 0.1s;
		cursor: pointer;
		box-shadow: 4px 4px 4px #00000030;
		border: 1px solid ${Palette.borderContainer};

		&:hover {
			border: 1px solid ${Palette.primary};
		}

		.title {
			font-size: 1rem;
		}

		.item {
			font-size: 0.8rem;
			color: ${Palette.fadedText};

			&:nth-child(1) {
				margin-right: 1rem;
			}
		}
	}
`;
