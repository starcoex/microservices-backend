import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AbstractOutEntity } from '@app/common';

@InputType()
export class GenerateTwoFactorInput {}

@ObjectType()
export class GenerateTwoFactorOutput extends AbstractOutEntity {
  @Field({ nullable: true })
  secret?: string;

  @Field({ nullable: true })
  qrCode?: string;

  @Field({ nullable: true })
  qrCodeImage?: string;
}
