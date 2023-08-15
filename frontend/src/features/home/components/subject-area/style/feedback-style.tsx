import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledFeedback = styled.div<{ type: "error" | "success" }>`
	background-color: ${({ type }) => (type === "error" ? Palette.errorText : Palette.successText)};

	display: flex;
	justify-content: space-between;
	align-items: center;

	border-radius: ${Palette.borderRadius};
	padding: 5px 10px;
	margin: 1rem 0;

	.close {
		margin: 0;
		margin-left: 1rem;
		padding: 5px 10px;
	}
`;
