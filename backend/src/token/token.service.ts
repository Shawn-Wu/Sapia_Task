import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async genToken(username: string, password: string) {
        const user = await this.userService.findOne(username);

        // TODO add a maximum of 3 attempts within 5 minutes
        if (user?.password !== password){
            throw new UnauthorizedException();
        }

        const playload = {
            username: username
        }
        return {
            token: await this.jwtService.signAsync(playload),
        };
    }
}