import { InputType, PickType } from '@nestjs/graphql';
import { Reservation } from '../entities/reservation.entity';

@InputType()
export class CreateReservationInput extends PickType(Reservation, [
  'startDate',
  'endDate',
  'placeId',
  'invoiceId',
]) {}
