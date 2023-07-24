import { Palette } from "@/styles/palette";
import { styled } from "styled-components";

export const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;

	label {
		color: ${Palette.fadedText};
		font-weight: normal;
		font-size: 0.8rem;
	}
`;
