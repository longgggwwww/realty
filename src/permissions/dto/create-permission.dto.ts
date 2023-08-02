import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePermissionDto {
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
  code: string;

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

  @IsMongoId({
    message(validationArguments) {
      return `${validationArguments.property}: định dạng không hợp lệ, phải là format của mongoId`;
    },
  })
  @IsNotEmpty({
    message(validationArguments) {
      return `${validationArguments.property}: trường bắt buộc`;
    },
  })
  groupId: string;
}
