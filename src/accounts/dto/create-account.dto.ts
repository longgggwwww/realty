import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  provider: string;
}
