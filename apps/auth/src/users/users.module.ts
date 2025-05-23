import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Packages } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Packages.NOTIFICATIONS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('NOTIFICATIONS_GRPC_SERVICE_URL'),
            package: Packages.NOTIFICATIONS,
            protoPath: join(
              __dirname,
              '../../libs/common/proto/notifications.proto',
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, JwtService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
