import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@ObjectType()
export class UserResponse extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;
}
