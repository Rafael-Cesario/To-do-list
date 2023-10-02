"use client";

import { Palette } from "@/styles/palette";
import styled from "styled-components";

export const StyledMain = styled.main`
	grid-area: 2 / 2;

	display: grid;
	grid-template-columns: repeat(auto-fit, min(500px));
	column-gap: 1rem;
	row-gap: 1rem;
	justify-content: center;
	height: fit-content;
	margin: 4rem 1rem;

	.task {
		border-radius: ${Palette.borderRadius};
		background-color: ${Palette.container};
		padding: 1rem;
		max-width: 500px;
		width: 100%;
		min-height: 200px;
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;

		.date {
			font-size: 0.8rem;
			color: ${Palette.text + "90"};
		}
	}

	.title {
		text-transform: capitalize;
		font-size: 1.2rem;
	}

	.description {
		margin-bottom: 1rem;
		height: 85px;
		overflow: hidden;
	}

	.status,
	.tag {
		padding: 2px 8px;
		border-radius: ${Palette.borderRadius};
		margin: 4px;
		font-size: 0.8rem;
		color: #111;
		font-weight: bold;
	}

	.status {
		color: #eee;
		font-weight: normal;
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

	.tags {
		display: flex;
		flex-wrap: wrap;
		margin-top: 1rem;

		.tag {
			flex-grow: 1;
		}
	}
`;
