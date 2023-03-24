import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledDetails = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  background-color: ${colors.backgroundBlack};
  min-height: 95vh;
  border-radius: 3px;
  overflow: hidden;
  animation: show 0.5s ease-out;
  width: 50vw;
  min-width: 350px;

  @keyframes show {
    from {
      opacity: 0;
    }
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
    color: #ddd;
    font-weight: bold;
    cursor: pointer;
  }

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
    padding: 2rem 4rem;

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

    .container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .tags {
      margin: 3rem 0;

      .tag {
        background-color: #222;
        margin: 10px 10px 0 0;
        flex-grow: 1;
        border-radius: 3px;
        font-size: 0.9rem;
        text-transform: capitalize;
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;

        .remove-tag {
          width: fit-content;
          margin-left: 0.5rem;

          :hover {
            color: crimson;
          }
        }
      }

      .new-tag {
        outline: none;
        border: none;
        background-color: transparent;
        color: #ddd;
        font-weight: bold;
        background-color: #222;
        padding: 5px 10px;
        margin: 10px 10px 0 0;
        border-radius: 3px;
      }
    }

    .notes {
      margin: 3rem 0;
    }
  }
`;
