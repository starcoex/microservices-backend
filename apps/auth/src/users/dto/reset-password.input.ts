import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsString } from 'class-validator';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  passwordConfirmation: string;

  @Field(() => String, { nullable: true })
  @IsString()
  activationToken: string; // CamelCase 수정
}

@ObjectType()
export class ResetPasswordOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;
}
