import {
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
} from '@app/common/types/proto/auth';
import { User } from './users/entities/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Payload } from '@nestjs/microservices';
import { CurrentUser, GrpcLoggingInterceptor } from '@app/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UsersService } from './users/users.service';

@Controller('auth')
@AuthServiceControllerMethods()
@UseInterceptors(GrpcLoggingInterceptor)
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = this.authService.login(user, response);
    console.log('jwt', jwt);
    response.send(jwt);
  }

  @Post('logout')
  logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(response, user.id);
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any): Promise<User> {
    console.log('data', data);

    const user: User = {
      ...data.user,
      id: data.user.id,
    };

    return user;
  }
}
