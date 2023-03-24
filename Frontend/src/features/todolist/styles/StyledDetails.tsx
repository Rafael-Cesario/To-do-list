import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledDetails = styled.div`
  grid-row: 1 / span 2;
  grid-column: 3;
  background-color: ${colors.backgroundBlack};
  min-height: 90vh;
  border-radius: 3px;
  overflow: hidden;

  .tab {
    background-color: ${colors.backgroundBlue};
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    .close {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 1.5rem;
      font-weight: bold;
      color: #ddd;
      cursor: pointer;

      :hover {
        color: #aa0050;
      }
    }
  }

  .details {
    padding: 1rem;

    h1,
    h2 {
      font-size: 1rem;
    }

    textarea {
      width: 100%;
      outline: none;
      border: none;
      background-color: #222;
      border-radius: 3px;
      margin: 0.5rem 0;
      color: #ddd;
      padding: 1rem;
      resize: vertical;

      ::-webkit-scrollbar {
        background-color: #222;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #333;
      }
    }

    .task {
      margin: 1rem 0;
    }

    .status {
      margin: 1rem 0;
      color: #aaa;
      font-size: 0.8rem;
    }

    .tags {
      margin: 3rem 0;
    }

    .notes {
      margin: 3rem 0;
    }
  }
`;
