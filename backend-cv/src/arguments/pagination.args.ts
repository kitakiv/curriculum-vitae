import { Field, Int } from "@nestjs/graphql";

export class PaginationArgs {
    @Field(() => Int, { nullable: true, defaultValue: 1 }) 
    page?: number;
    @Field(() => Int, { nullable: true, defaultValue: 10 }) 
    limit?: number;
}