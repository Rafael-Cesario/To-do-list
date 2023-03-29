import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyleCreateList = styled.div`
  background-color: ${(p: Theme) => p.theme.container};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  width: 90vw;
  height: 50vh;
  min-height: 150px;
  position: absolute;
  top: 10vh;

  animation: show 0.5s both;
  @keyframes show {
    from {
      top: -10vh;
      opacity: 0;
    }
  }

  .list-name {
    outline: none;
    border: none;
    border-bottom: 2px solid ${(p: Theme) => p.theme.textPrimary};
    color: ${(p: Theme) => p.theme.color};
    background-color: transparent;
    padding: 5px 20px;
    margin: 5rem;
    font-weight: bold;
    width: 50%;

    ::placeholder {
      color: ${(p: Theme) => p.theme.faded};
    }
  }

  .buttons {
    width: 50%;
    display: flex;
    justify-content: space-evenly;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      background-color: transparent;
      color: ${(p: Theme) => p.theme.faded};
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 2px;
      width: 100%;

      :hover {
        color: ${(p: Theme) => p.theme.color};
        background-color: ${(p: Theme) => p.theme.primary};
      }
    }
  }

  .tab {
    background-color: ${(p: Theme) => p.theme.primary};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1rem;
      margin: 5px 20px;
    }

    button {
      border: none;
      outline: none;
      padding: 5px 20px;
      background-color: transparent;
      color: ${(p: Theme) => p.theme.color};
      cursor: pointer;

      :hover {
        background-color: ${(p: Theme) => p.theme.textError};
      }
    }
  }
`;
