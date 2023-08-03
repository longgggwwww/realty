import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateRoleDto {
  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  level: number;

  @Length(1, 225)
  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId({ each: true })
  @IsNotEmpty()
  permissionIds: string[];
}
