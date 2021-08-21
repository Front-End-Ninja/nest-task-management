import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {UsersRepository} from "./users.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user: User = await this.usersRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
