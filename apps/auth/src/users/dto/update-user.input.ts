import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['email', 'name', 'phoneNumber']),
) {}

@ObjectType()
export class UpdateUserOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;
}
