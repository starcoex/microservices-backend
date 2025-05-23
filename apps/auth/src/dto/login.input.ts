import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AbstractOutEntity } from '@app/common';
import { IsBoolean, IsOptional } from 'class-validator';
import { Activation } from '../users/entities/activation.entity';

@InputType()
export class LoginInput extends PartialType(
  PickType(User, ['email', 'password', 'rememberMe']),
) {}

@ObjectType()
export class LoginOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Activation, { nullable: true })
  activation?: Activation;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  twoFactorRequired?: boolean;

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  twoFactorToken?: string;
}
