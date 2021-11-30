import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userQueryString } from "src/common/query";
import { Mapper } from "../mapper/mapper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly mapper: Mapper) {
		super({
			secretOrKey: process.env.JWTSECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
		});
	}

	async validate(payload) {
		const { user_id } = payload;
		const user = await this.mapper.mapper(userQueryString.findOne, [
			user_id,
		]);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
		//return { userId: payload.sub, username: payload.username };
	}
}
