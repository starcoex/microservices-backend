import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Reservation } from '../entities/reservation.entity';

@InputType()
export class RemoveReservationInput extends PickType(Reservation, ['id']) {}

@ObjectType()
export class DeleteReservationOutput {}
