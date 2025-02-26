import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './todos.dto';

// export function generateId() {
//   if (generateId._id === undefined) {
//     generateId._id = 0;
//   }

//   const res = generateId._id.toString(36);
//   generateId._id += 1;
//   return res;
// }

export interface Todo {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: '1',
      title: 'test',
      description: 'test',
      done: false,
    },
    {
      id: '2',
      title: 'test2',
      description: 'test2',
      done: true,
    },
  ];
  private _id = 3;

  create({ title, description }: CreateTodoDto) {
    console.log(title, description);
    const todo: Todo = {
      id: (this._id++).toString(),
      title,
      description,
      done: false,
    };

    this.todos.push(todo);
    return todo;
  }

  getAll() {
    return this.todos;
  }

  getOne(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: string, { description, title, done }: UpdateTodoDto) {
    const todo = this.getOne(id);
    todo.done = done;
    todo.title = title;
    todo.description = description;

    return todo;
  }

  delete(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
