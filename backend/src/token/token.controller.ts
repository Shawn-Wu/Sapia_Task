import { Body, Controller, Post } from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenDto } from "./dto/create_token.dto";


@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post()
  signIn(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.genToken(createTokenDto.username, createTokenDto.password);
  }
}