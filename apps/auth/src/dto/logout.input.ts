import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { AbstractOutEntity } from '@app/common';
import { User } from '../users/entities/user.entity';

@InputType()
export class UserLogoutInput extends PickType(User, ['id']) {}

@ObjectType()
export class UserLogoutOutput extends AbstractOutEntity {}
