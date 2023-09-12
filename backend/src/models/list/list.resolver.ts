import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListModel } from './list.models';
import { CreateListInput, GetListInput } from './list.dto';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query(() => [ListModel])
  async getLists(@Args('getListData') getListData: GetListInput) {
    return this.listService.getLists(getListData);
  }

  @Mutation(() => ListModel)
  async createList(@Args('createListData') createListData: CreateListInput) {
    return this.listService.createList(createListData);
  }
}
