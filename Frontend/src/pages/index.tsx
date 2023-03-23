import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';

const Index = () => {
  return (
    <StyledIndex>
      <Header />
      <Lists />
    </StyledIndex>
  );
};

export default Index;
