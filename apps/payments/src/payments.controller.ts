import { Controller, UseInterceptors } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  CreateChargeMessage,
  CreateChargeResponse,
  GrpcLoggingInterceptor,
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@PaymentsServiceControllerMethods()
@UseInterceptors(GrpcLoggingInterceptor)
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  createCharge(
    request: CreateChargeMessage,
  ):
    | Promise<CreateChargeResponse>
    | Observable<CreateChargeResponse>
    | CreateChargeResponse {
    throw new Error('Method not implemented.');
  }
}
