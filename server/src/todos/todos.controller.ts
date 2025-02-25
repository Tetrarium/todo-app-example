import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosServece: TodosService) {}

  @Get()
  getAll() {
    return this.todosServece.getAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    return this.todosServece.create(createTodoDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todosServece.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosServece.update(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosServece.delete(id);
  }
}
