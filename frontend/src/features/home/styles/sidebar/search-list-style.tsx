import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledSearchList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 2rem 0;
	background-color: ${Palette.background};
	border: 2px solid ${Palette.borderContainer};
	border-radius: ${Palette.borderRadius};
	padding: 0 1rem;

	.icon {
		width: 20px;
		height: 100%;
		margin: 4px;
	}

	.search-list {
		background-color: ${Palette.background};
		margin-bottom: 2rem;
		width: 100%;
		margin: 0;
		border: none;

		&:focus {
			outline: none;
		}
	}
`;
