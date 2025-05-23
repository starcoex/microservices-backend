import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Activation } from '../entities/activation.entity';
import { IsOptional, IsString } from 'class-validator';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class VerifyEmailInput extends PickType(Activation, [
  'activationCode',
  'activationToken',
]) {}

@InputType()
export class VerifyChangeEmailInput extends PickType(Activation, [
  'activationCode',
  'activationToken',
]) {}

@ObjectType()
abstract class CommonVerificationOutput extends AbstractOutEntity {
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

@ObjectType()
export class VerifyChangeEmilOutput extends CommonVerificationOutput {}

@ObjectType()
export class VerifyEmailOutput extends CommonVerificationOutput {}
