import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PasswordChangeInput {
  @Field(() => String, { description: '기존 비밀번호' })
  oldPassword: string;

  @Field(() => String, { description: '새 비밀번호' })
  newPassword: string;
}

@InputType()
export class UpdatePasswordInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  userId: number;

  @Field(() => PasswordChangeInput)
  passwordChange: PasswordChangeInput;
}
