import cloneDeep from 'lodash/cloneDeep';
import { client } from '../../client';
import { InputCreateTodo, InputDeleteTodo, ITodoModel, READ_TODOS } from '../interfaces/interfaceQueriesTodos';

export class UpdateCacheTodos {
  private async readCachedTodos(email: string, listName: string) {
    const { readTodos } = (await client.readQuery({
      query: READ_TODOS,
      variables: { readTodos: { email, listName } },
    })) as { readTodos: ITodoModel[] };

    const todos = cloneDeep(readTodos);
    return todos;
  }

  private writeCachedTodos(email: string, listName: string, todos: ITodoModel[]) {
    client.writeQuery({
      query: READ_TODOS,
      variables: { readTodos: { email, listName } },
      data: { readTodos: todos },
    });
  }

  async onCreateTodo({ email, id, listName, task }: InputCreateTodo) {
    const todos = await this.readCachedTodos(email, listName);
    const todo: ITodoModel = { id, status: 'next', tags: [], task, notes: '' };
    todos.push(todo);
    this.writeCachedTodos(email, listName, todos);
  }

  async onDeleteTodo({ email, listName, id }: InputDeleteTodo) {
    const todos = await this.readCachedTodos(email, listName);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos.splice(todoIndex, 1);
    this.writeCachedTodos(email, listName, todos);
  }
}
