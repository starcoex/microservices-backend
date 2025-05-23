import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from '@app/common';

@InputType('ActivationInput', { isAbstract: true })
@ObjectType()
export class Activation extends AbstractEntity {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  activationCode?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  activationToken?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  requestedEmail?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  twoFactorSecret?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  @IsOptional()
  twoFactorActivated?: boolean;

  @Field(() => User, { nullable: true })
  user?: User;
}
