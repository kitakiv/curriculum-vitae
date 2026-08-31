import { Field, ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "../../arguments/pagination.type";
import { Project } from "./project.entity";

@ObjectType()
export class ProjectPaginationResponse extends PaginationResponse<Project> {
  @Field(() => [Project])
  items: Project[];

  constructor({
    items,
    total,
    page,
    limit,
  }: {
    items: Project[] | null;
    total: number;
    page: number;
    limit: number;
  }) {
    super({ total, page, limit });
    this.items = items;
  }
}