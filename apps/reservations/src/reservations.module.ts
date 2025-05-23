import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { join } from 'path';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LoggerModule, Packages } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationsResolver } from './reservations.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RESERVATIONS_PORT: Joi.number().required(),
        AUTH_GRPC_SERVICE_URL: Joi.string().required(),
        RESERVATIONS_DATABASE_URL: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: () => ({
        autoSchemaFile: { federation: 2 },
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        // cors: {
        //   origin: 'http://localhost:3000',
        //   credentials: true,
        // },
      }),
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: Packages.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: Packages.AUTH,
            protoPath: join(__dirname, '../../libs/common/proto/auth.proto'),
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: Packages.PAYMENTS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: Packages.PAYMENTS,
            protoPath: join(
              __dirname,
              '../../libs/common/proto/payments.proto',
            ),
            url: configService.getOrThrow('PAYMENTS_GRPC_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService, ReservationsResolver],
})
export class ReservationsModule {}
