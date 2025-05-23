import { Controller, UseInterceptors } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  GrpcLoggingInterceptor,
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
  NotifyEmailMessage,
} from '@app/common';

@Controller()
@NotificationsServiceControllerMethods()
@UseInterceptors(GrpcLoggingInterceptor)
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  async notifyEmail(request: NotifyEmailMessage) {
    await this.notificationsService.notifyEmail(request);
  }
}
