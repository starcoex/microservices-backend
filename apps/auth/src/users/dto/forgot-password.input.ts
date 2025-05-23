import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class ForgotPasswordEmailInput extends PickType(User, ['email']) {}

@ObjectType()
export class ForgotPasswordResponse extends AbstractOutEntity {
  @Field(() => String, {
    nullable: true,
    description: '상태 메시지(성공/실패)',
  })
  statusMessage?: string;
}
