import styled from 'styled-components';

export const StyledTitle = styled.main`
  display: flex;
  align-items: center;

  position: absolute;
  top: 45vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: -1;

  .title {
    p {
      color: #888;
      font-weight: bold;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
`;
