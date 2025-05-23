import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class ActivationUserInput {
  @Field()
  @IsNotEmpty({ message: '활성화 토큰은 필수입니다.' })
  @IsString()
  activationCode: string;
}

@ObjectType()
export class ActivationUserOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;
}
