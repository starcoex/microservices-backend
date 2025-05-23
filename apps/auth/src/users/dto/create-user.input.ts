import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'name',
  'passwordConfirmation',
  'phoneNumber',
  'roles',
]) {}

@ObjectType()
export class CreateUserOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  activationCode?: string;

  @Field(() => String, { nullable: true })
  activationToken?: string;
}
