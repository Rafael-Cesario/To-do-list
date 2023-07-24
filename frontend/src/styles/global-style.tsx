"use client";

import { createGlobalStyle } from "styled-components";
import { Palette } from "./palette";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${Palette.background};
        color: ${Palette.text}
    }

    input, button {
        border: 2px solid ${Palette.borderContainer};
        border-radius: ${Palette.borderRadius};
        background-color: ${Palette.container};
        color: ${Palette.text};
        padding: 10px 20px;
        margin: 0.5rem;
    }


    button {
        cursor: pointer;
        font-weight: bold;

        &:hover {
            background-color: ${Palette.text};
            color: ${Palette.container};
        }
    }
`;
