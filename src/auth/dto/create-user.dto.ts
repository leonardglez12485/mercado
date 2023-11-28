

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'The password must have a Uppercase, lowercase letter and a number'})
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;
}

