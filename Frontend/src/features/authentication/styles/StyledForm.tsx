import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 2rem;
  padding: 2rem 10rem;
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

      .field {
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

        .password-field {
          margin: 0;
          display: flex;
          flex-flow: row-reverse;
          align-items: center;
          background-color: ${colors.backgroundBlue};

          input {
            padding-right: 3rem;
          }

          .icon {
            margin: 0 1rem;
            position: absolute;
            cursor: pointer;
          }
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

`;
