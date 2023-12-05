import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
