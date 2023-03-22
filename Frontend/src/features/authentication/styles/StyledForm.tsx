import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 2rem;
  padding: 2rem;
  background-color: ${colors.backgroundBlack};
  animation: showForm 0.3s ease-in both;

  @keyframes showForm {
    from {
      opacity: 0;
      transform: translate(5rem, 0);
    }

    to {
      opacity: 1;
    }
  }

  .title {
    position: absolute;
    transform: translate(0, -3rem);
    background-color: ${colors.backgroundBlue};
    padding: 0.5rem 4rem;
    font-size: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    .inputs {
      margin: 5rem 0;

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 2rem 0;

        label {
          max-width: 300px;
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
  }
  .submit {
    background-color: ${colors.backgroundBlue};
  }

  .error {
    color: #eb2727;
    font-weight: bold;
  }

  .loading {
    position: absolute;
    bottom: 0;
    margin-bottom: 5rem;
    font-weight: bold;
    font-size: 1.5rem;

    ::after {
      content: '';
      background-color: ${colors.backgroundBlack};
      width: 5rem;
      height: 2rem;
      position: absolute;
      top: 0;
      left: 0;
      animation: loading 1s infinite;

      @keyframes loading {
        from {
          transform: translate(0, 0);
        }

        to {
          transform: translate(5rem, 0);
        }
      }
    }
  }
`;
