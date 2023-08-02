import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePermissionGroupDto {
  @Length(1, 255, {
    message(validationArguments) {
      return `${validationArguments.property}: độ dài ký tự từ 1 đến 255`;
    },
  })
  @IsString({
    message(validationArguments) {
      return `${validationArguments.property}: phải là chuỗi`;
    },
  })
  @IsNotEmpty({
    message(validationArguments) {
      return `${validationArguments.property}: trường bắt buộc`;
    },
  })
  name: string;

  @Length(1, 255, {
    message(validationArguments) {
      return `${validationArguments.property}: độ dài ký tự từ 1 đến 255`;
    },
  })
  @IsString({
    message(validationArguments) {
      return `${validationArguments.property}: phải là chuỗi`;
    },
  })
  @IsOptional()
  description?: string;
}
