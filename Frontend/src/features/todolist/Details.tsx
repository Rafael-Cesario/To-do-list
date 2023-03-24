import { StyledDetails } from './styles/StyledDetails';

export const Details = () => {
  return (
    <StyledDetails>
      <div className="tab">
        <button className="close">x</button>
      </div>

      <div className="details">
        <h1 className="task">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quam?</h1>
        <span className="status">Status: done</span>

        <div className="tags">
          <h2>Tags</h2>
          <textarea placeholder="Use vírgula para separar suas tags." />
        </div>

        <div className="notes">
          <h2>Anotações</h2>
          <textarea placeholder="........." />
        </div>
      </div>
    </StyledDetails>
  );
};
