import styled from 'styled-components';

export const StyledTodoList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  column-gap: 1rem;
`;
