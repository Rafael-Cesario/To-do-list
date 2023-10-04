import { StyledLoading } from './styles/StyledLoading';

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return <StyledLoading>{isLoading && <p className="loading">......</p>}</StyledLoading>;
};
