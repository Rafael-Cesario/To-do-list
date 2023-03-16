import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 2rem;
  padding: 2rem;
  background-color: ${colors.backgroundBlack};

  .title {
    position: absolute;
    transform: translate(0, -3rem);
    background-color: ${colors.backgroundBlue};
    padding: 0.5rem 4rem;
    font-size: 1rem;
  }

  .inputs {
    margin: 5rem 0;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 2rem 0;

      label {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
      }

      input {
        background-color: ${colors.backgroundBlue};
        outline: none;
        border: none;
        padding: 0.2rem 1rem;
        width: 30vw;
        max-width: 300px;
        color: #ddd;
      }
    }
  }

  .submit {
    background-color: ${colors.backgroundBlue};
  }
`;
