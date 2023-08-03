import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePermissionGroupDto {
  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(1, 225)
  @IsString()
  @IsOptional()
  description?: string;
}
