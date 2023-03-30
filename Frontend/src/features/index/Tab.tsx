import { StyledTab } from './styles/StyledTab';

interface Props {
  props: {
    title: string;
    setIsOpen: (state: boolean) => void;
  };
}

export const Tab = ({ props: { setIsOpen, title } }: Props) => {
  return (
    <StyledTab>
      <h1 className="title">{title}</h1>
      <button className="perfil-close" onClick={() => setIsOpen(false)}>
        x
      </button>
    </StyledTab>
  );
};
