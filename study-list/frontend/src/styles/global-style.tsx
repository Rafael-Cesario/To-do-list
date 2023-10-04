"use client";

import { createGlobalStyle } from "styled-components";
import { Palette } from "./palette";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *::-webkit-scrollbar {
         width: 10px;
         background-color: ${Palette.background};
    } 

    *::-webkit-scrollbar-button {
         background-color: #222;
    }

    *::-webkit-scrollbar-thumb {
         background-color: #333;
         border-radius: 2px;
    }

    body {
        background-color: ${Palette.background};
        color: ${Palette.text};

    }

    input, button {
        border: 2px solid ${Palette.borderContainer};
        border-radius: ${Palette.borderRadius};
        background-color: ${Palette.container};
        color: ${Palette.text};
        padding: 10px 20px;
        margin: 0.5rem 0;

        &:focus {
            outline: 2px solid ${Palette.primary};
        }
    }

    input {
        width: 100%;
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
