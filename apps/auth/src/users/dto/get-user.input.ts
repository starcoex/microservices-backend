import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UserIdInput extends PickType(User, ['id']) {}
