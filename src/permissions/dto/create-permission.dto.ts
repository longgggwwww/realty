import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePermissionDto {
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  code: string;

  @Length(1, 255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  groupId: string;
}
