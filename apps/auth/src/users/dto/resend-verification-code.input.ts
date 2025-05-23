import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsOptional, IsString } from 'class-validator';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class ResendVerificationCodeInput extends PickType(User, ['email']) {}

@ObjectType()
export class ResendVerificationCodeOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  @IsString()
  @IsOptional()
  activationCode?: string;

  @Field()
  @IsString()
  @IsOptional()
  activationToken?: string;
}
