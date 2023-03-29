import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 2rem;
  padding: 2rem 10rem;
  position: relative;
  background-color: ${(props: Theme) => props.theme.container};
  border: 3px solid ${(props: Theme) => props.theme.gray};
  border-radius: 3px;
  box-shadow: 5px 5px 2px #10101020;

  animation: showForm 0.3s ease-in both;
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
      background-color: ${(props: Theme) => props.theme.primary};
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
          color: ${(props: Theme) => props.theme.color};
        }

        input {
          border: none;
          outline: none;
          width: 30vw;
          max-width: 300px;
          font-size: 0.9rem;
          background-color: transparent;
          border-bottom: 2px solid ${(props: Theme) => props.theme.textPrimary};
          color: ${(props: Theme) => props.theme.color};
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
          color: ${(props: Theme) => props.theme.textError};
          font-weight: bold;
        }
      }
    }
  }

  .submit {
    background-color: ${(props: Theme) => props.theme.primary};
    border-radius: 3px;
    width: 100%;

    :active {
      transform: scale(0.95);
    }
  }
`;
