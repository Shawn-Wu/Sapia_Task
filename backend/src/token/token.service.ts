import { Injectable, UnauthorizedException, ForbiddenException, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RedisInstance } from 'src/redis/redis';

const MAX_TRY_NUM = 3
// unit: second
const MAX_TRY_WITHIN_TIMES = 60

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async genToken(username: string, password: string) {
        const redis = RedisInstance.initRedis();
        const failCount = await redis.get(username);
        if (failCount != null && Number(failCount) >= MAX_TRY_NUM) {
            throw new HttpException("A maximum of " + MAX_TRY_NUM + " in " + MAX_TRY_WITHIN_TIMES + "s please try later", HttpStatus.FORBIDDEN);
        }

        const user = await this.userService.findOne(username);
        if (user?.password !== password) {
            if (failCount == null) {
                redis.setex(username, MAX_TRY_WITHIN_TIMES, 1)
                throw new HttpException("login fail " + (MAX_TRY_NUM-1) + " times left in " + MAX_TRY_WITHIN_TIMES + "s", HttpStatus.UNAUTHORIZED);
            }
            redis.incr(username);
            throw new HttpException("login fail " + (MAX_TRY_NUM-Number(failCount)-1) + " times left in " + MAX_TRY_WITHIN_TIMES + "s", HttpStatus.UNAUTHORIZED);
        }

        const playload = {
            username: username
        }
        return {
            token: await this.jwtService.signAsync(playload),
        };
    }
}