import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { GetReservationInput } from './dto/get-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { RemoveReservationInput } from './dto/remove-reservation.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async reservationCreate(createReservationInput: CreateReservationInput) {
    try {
      return await this.prismaService.reservation.create({
        data: {
          ...createReservationInput,
          timestamp: new Date(),
          userId: 1,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getReservations() {
    try {
      return await this.prismaService.reservation.findMany();
    } catch (err) {
      console.log(err);
    }
  }

  async getReservation(getReservationInput: GetReservationInput) {
    try {
      return await this.prismaService.reservation.findUnique({
        where: {
          id: getReservationInput.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateReservation(updateReservationInput: UpdateReservationInput) {
    try {
      return await this.prismaService.reservation.update({
        where: {
          id: updateReservationInput.id,
        },
        data: {
          ...updateReservationInput,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async removeReservation(removeReservationInput: RemoveReservationInput) {
    try {
      return await this.prismaService.reservation.delete({
        where: {
          id: removeReservationInput.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
