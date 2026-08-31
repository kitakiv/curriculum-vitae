import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType({ isAbstract: true })
export class PaginationResponse<T> {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  constructor({
    total,
    page,
    limit,
  }: {
    total: number;
    page: number;
    limit: number;
  }) {
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
