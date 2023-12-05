import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TokenService } from "./token.service";
import { TokenController } from "./token.controller";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            // token expire after 2 days
            signOptions: { expiresIn: '2 days' },
          }),
    ],
    providers: [
        TokenService
    ],
    controllers: [
        TokenController
    ],
})
export class TokenModule {}