import { Palette } from "@/styles/palette";
import styled from "styled-components";

type Notification = "error" | "success";

export const StyledNotification = styled.div<{ type: Notification }>`
	--type: ${({ type }) => (type === "success" ? Palette.success : Palette.error)};

	z-index: 2;
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${Palette.container};
	padding: 1rem;
	margin: 1rem;
	border-left: 8px solid var(--type);
	border-radius: ${Palette.borderRadius};
	width: 100%;
	max-width: 400px;
	box-shadow: 10px 10px 5px #00000030;

	.close {
		position: absolute;
		top: 0;
		right: 0;
		background-color: transparent;
		color: ${Palette.text + "50"};
		font-size: 1rem;

		&:hover {
			color: #eee;
			background-color: ${Palette.error};
		}
	}

	.title {
		color: var(--type);
		font-size: 1.5rem;
		margin-bottom: 8px;
	}

	.text {
		color: ${Palette.text};
	}
`;
