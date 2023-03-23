import { CreateNewList } from '../features/index/CreateNewList';
import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';

const Index = () => {
  return (
    <StyledIndex>
      <Header />
      <Lists />
      <CreateNewList />
    </StyledIndex>
  );
};

export default Index;
