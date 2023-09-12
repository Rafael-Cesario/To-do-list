import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ListModel } from './list.models';
import { CreateListInput } from './list.dto';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
  constructor(private listService: ListService) {}

  @Mutation(() => ListModel)
  async createList(@Args('createListData') createListData: CreateListInput) {
    return this.listService.createList(createListData);
  }
}
