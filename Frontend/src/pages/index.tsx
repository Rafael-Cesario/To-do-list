import { useState } from 'react';
import { CreateList } from '../features/index/CreateList';
import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';

const Index = () => {
  const [showCreateNewList, setShowCreateNewList] = useState(false);

  return (
    <StyledIndex>
      <Header props={{ showCreateNewList, setShowCreateNewList }} />
      {showCreateNewList && <CreateList props={{ setShowCreateNewList }} />}
      <Lists />
    </StyledIndex>
  );
};

export default Index;
