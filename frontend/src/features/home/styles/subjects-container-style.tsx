import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSubjectsContainer = styled.div`
	width: 90%;
	max-width: 1000px;

	.subject {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: ${Palette.container};
		padding: 0.5rem 1rem;
		border-bottom: 4px solid ${Palette.borderContainer};
		border-radius: ${Palette.borderRadius};
		margin-bottom: 1rem;

		.title {
			font-size: 1.2rem;
		}

		.info {
			margin-left: 10px;

			.item {
				border-radius: ${Palette.borderRadius};
				background-color: ${Palette.borderContainer};
				padding: 4px 16px;
				margin: 4px;
				font-size: 12px;
			}
		}
	}
`;
