import { client } from '../../client';
import { InputCreateList, InputDeleteList, InputRenameList, READ_LISTS } from '../interfaces/interfaceQueriesLists';

export class UpdateCacheLists {
  private readCachedLists(email: string) {
    const { readLists } = client.readQuery({
      query: READ_LISTS,
      variables: { email },
    });

    const lists = [...readLists.lists];
    return lists;
  }

  private writeCachedLists(email: string, lists: string[]) {
    client.writeQuery({
      query: READ_LISTS,
      variables: { email },
      data: { readLists: { lists } },
    });
  }

  onCreateList({ email, listName }: InputCreateList) {
    const lists = this.readCachedLists(email);
    lists.push(listName);
    this.writeCachedLists(email, lists);
  }

  onRenameList({ email, newName, oldName }: InputRenameList) {
    const lists = this.readCachedLists(email);

    const listIndex = lists.indexOf(oldName);
    lists.splice(listIndex, 1, newName);

    this.writeCachedLists(email, lists);
  }

  onDeleteList({ email, listName }: InputDeleteList) {
    const lists = this.readCachedLists(email);

    const listIndex = lists.indexOf(listName);
    lists.splice(listIndex, 1);

    this.writeCachedLists(email, lists);
  }
}
