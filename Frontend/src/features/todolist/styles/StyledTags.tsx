import styled from 'styled-components';

export const StyledTags = styled.div`
  margin: 3rem 0;

  .tag {
    background-color: #303030;
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
    background-color: #303030;
    padding: 5px 10px;
    margin: 10px 10px 0 0;
    border-radius: 3px;
  }
`;
