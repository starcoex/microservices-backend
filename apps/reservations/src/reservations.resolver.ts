import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { GetReservationInput } from './dto/get-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { RemoveReservationInput } from './dto/remove-reservation.input';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.reservationCreate(createReservationInput);
  }

  @Query(() => [Reservation])
  getReservations() {
    return this.reservationsService.getReservations();
  }

  @Query(() => Reservation)
  getReservation(
    @Args('getReservationInput') getReservationInput: GetReservationInput,
  ) {
    return this.reservationsService.getReservation(getReservationInput);
  }

  @Mutation(() => Reservation)
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.updateReservation(updateReservationInput);
  }

  @Mutation(() => Reservation)
  removeReservation(
    @Args('removeReservationInput')
    removeReservationInput: RemoveReservationInput,
  ) {
    return this.reservationsService.removeReservation(removeReservationInput);
  }
}
