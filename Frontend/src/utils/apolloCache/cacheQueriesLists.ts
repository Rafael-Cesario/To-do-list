import { client } from '../../client';
import { InputCreateList, READ_LISTS } from '../interfaces/interfaceQueriesLists';

export class UpdateCacheLists {
  onCreateList(createList: InputCreateList) {
    const { readLists } = client.readQuery({
      query: READ_LISTS,
      variables: { email: createList.email },
    });

    const lists = [...readLists.lists];
    lists.push(createList.listName);

    client.writeQuery({
      query: READ_LISTS,
      variables: { email: createList.email },
      data: { readLists: { lists } },
    });
  }
}
