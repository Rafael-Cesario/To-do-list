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
`;
