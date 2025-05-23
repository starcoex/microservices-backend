import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class ChangeEmailInput extends PickType(User, ['email']) {}

@ObjectType()
export class ChangeEmailOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;
}
