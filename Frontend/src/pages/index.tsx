import { useState } from 'react';
import { CreateNewList } from '../features/index/CreateNewList';
import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';

const Index = () => {
  const [showCreateNewList, setShowCreateNewList] = useState(false);

  return (
    <StyledIndex>
      <Header props={{ showCreateNewList, setShowCreateNewList }} />
      {showCreateNewList && <CreateNewList />}
      <Lists />
    </StyledIndex>
  );
};

export default Index;
