import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractOutEntity } from '@app/common';
import { User } from '../entities/user.entity';
import { Activation } from '../entities/activation.entity';

@ObjectType()
export class GetLoggedOutput extends AbstractOutEntity {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Activation, { nullable: true })
  activation?: Activation;
}
