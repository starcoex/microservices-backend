import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

import { ClientGrpc } from '@nestjs/microservices';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  User,
} from '@app/common/types/proto/auth';
import { Packages } from '@app/common/types/packages';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(GqlAuthGuard.name);
  private authService: AuthServiceClient;

  constructor(@Inject(Packages.AUTH) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = this.getRequest(context) as {
      cookies?: { Authentication?: string };
    };
    const accessToken = req.cookies?.Authentication;
    console.log('accessToken', accessToken);
    if (!accessToken) {
      return false;
    }
    return this.authService
      .authenticate({
        Authentication: accessToken,
      })
      .pipe(
        map((res) => {
          this.logger.log(res);
          this.getRequest(context).user = res;
          return true;
        }),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }

  private getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{
      req: { cookies?: { Authentication?: string }; user?: User };
    }>().req;
  }
}
