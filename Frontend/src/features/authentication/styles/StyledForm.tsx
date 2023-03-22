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
  box-shadow: 5px 5px 2px #111;
  border-radius: 3px;

  @keyframes showForm {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    transform: translate(0, -5rem);

    .title {
      border-radius: 3px;
      background-color: ${colors.backgroundBlue};
      padding: 0.5rem 4rem;
      font-size: 1rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

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
          font-weight: bold;
          color: #ddd;
        }

        input {
          border: none;
          outline: none;
          background-color: transparent;
          border-bottom: 2px solid ${colors.backgroundBlue};
          width: 30vw;
          max-width: 300px;
          color: #ddd;
          font-size: 0.9rem;
        }

        .password-field {
          margin: 0;
          display: flex;
          flex-flow: row-reverse;
          align-items: center;
          position: relative;

          input {
            padding-right: 3rem;
          }

          .icon {
            position: absolute;
            top: -5px;
            cursor: pointer;
          }
        }

        .error {
          color: red;
          font-weight: bold;
        }
      }
    }
  }

  .submit {
    background-color: ${colors.backgroundBlue};
    border-radius: 3px;
    width: 100%;

    :active {
      transform: scale(0.95);
    }
  }
`;
