import { client } from '../../client';
import { InputCreateList, InputDeleteList, InputRenameList, READ_LISTS } from '../interfaces/interfaceQueriesLists';

export class UpdateCacheLists {
  private async readCachedLists(email: string) {
    const { readLists } = await client.readQuery({
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

  async onCreateList({ email, listName }: InputCreateList) {
    const lists = await this.readCachedLists(email);
    lists.push(listName);
    this.writeCachedLists(email, lists);
  }

  async onRenameList({ email, newName, oldName }: InputRenameList) {
    const lists = await this.readCachedLists(email);

    const listIndex = lists.indexOf(oldName);
    lists.splice(listIndex, 1, newName);

    this.writeCachedLists(email, lists);
  }

  async onDeleteList({ email, listName }: InputDeleteList) {
    const lists = await this.readCachedLists(email);

    const listIndex = lists.indexOf(listName);
    lists.splice(listIndex, 1);

    this.writeCachedLists(email, lists);
  }
}
