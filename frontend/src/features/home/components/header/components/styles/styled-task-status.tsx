import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledTaskStatus = styled.div`
	margin: 2rem 0;

	.next,
	.current,
	.done {
		width: 120px;
		height: 30px;
		margin: 8px;
		padding: 0;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}

	.next {
		background-color: ${Palette.insideContainer};
	}

	.current {
		background-color: ${Palette.primary};
	}

	.done {
		background-color: ${Palette.success};
	}

	.active {
		opacity: 1;
		position: relative;
	}
`;
