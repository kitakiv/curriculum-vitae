import { Field, ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "../../arguments/pagination.type";
import { TechStack } from "./techstack.entity";

@ObjectType()
export class TechStackPaginationResponse extends PaginationResponse<TechStack> {
  @Field(() => [TechStack])
  items: TechStack[];

  constructor({
    items,
    total,
    page,
    limit,
  }: {
    items: TechStack[] | null;
    total: number;
    page: number;
    limit: number;
  }) {
    super({ total, page, limit });
    this.items = items;
  }
}