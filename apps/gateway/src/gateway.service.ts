import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient, Packages } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(Packages.AUTH) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  async getAuthContext(req: any) {
    console.log('req', req);
    if (!req.headers?.authentication) {
      throw new UnauthorizedException('authentication header is missing');
    }

    return this.authenticate(req.headers.authentication);
  }

  private async authenticate(authentication: string): Promise<{ user: any }> {
    try {
      const user = await lastValueFrom(
        this.authService.authenticate({
          Authentication: authentication,
        }),
      );
      console.log('user', user);
      return { user };
    } catch (err) {
      throw new UnauthorizedException(
        err?.message || 'Authorization failed during authentication',
      );
    }
  }
}
