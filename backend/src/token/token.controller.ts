import { Body, Controller, Post } from "@nestjs/common";
import { TokenService } from "./token.service";


@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.tokenService.genToken(signInDto.username, signInDto.password);
  }
}