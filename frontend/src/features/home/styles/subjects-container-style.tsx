import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSubjectsContainer = styled.div`
	max-width: 1000px;
	margin: 2rem;

	.subject {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: ${Palette.container};
		padding: 0.5rem 1rem;
		border-bottom: 4px solid ${Palette.borderContainer};
		border-radius: ${Palette.borderRadius};

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
