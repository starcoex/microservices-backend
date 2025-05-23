import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { AbstractOutEntity } from '@app/common';
import { User } from '../users/entities/user.entity';

@InputType()
export class TwoFactorInput extends PickType(User, ['rememberMe']) {
  @Field()
  @IsString()
  twoFactorToken: string;

  @Field()
  @IsString()
  otp: string;
}

@ObjectType()
export class TwoFactorOutput extends AbstractOutEntity {
  @Field({ nullable: true })
  accessToken?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
