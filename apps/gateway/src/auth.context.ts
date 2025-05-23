import { ClientGrpc } from '@nestjs/microservices';
import { app } from './app';
import { AUTH_SERVICE_NAME, AuthServiceClient, Packages } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';

export const authContext = async ({ req }: { req: any }) => {
  try {
    console.log('Authentication', req.headers.authentication);
    const client: ClientGrpc = app.get<ClientGrpc>(Packages.AUTH);
    const authService = client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    const user = await lastValueFrom(
      authService.authenticate({ Authentication: req.headers.authentication }),
    ).catch((err) => {
      console.log('err', err);
      throw err;
    });
    console.log('user', user);

    return { user };
  } catch (err) {
    console.log('___________-');
    console.log(err);
    throw new UnauthorizedException(err);
  }
};
