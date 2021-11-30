import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly mapper: Mapper,
		private readonly jwtService: JwtService,
	) {}

	async validate(userid: string, userpw: string): Promise<any> {
		const findOne = await this.mapper.mapper(userQueryString.findOne, [
			userid,
		]);
		console.log(findOne.data[0]["password"]);

		if (
			findOne.data.length !== 0 &&
			findOne.data[0]["password"] === userpw
		) {
			return findOne;
		} else {
			return false;
		}
	}
	//user: userid: string, password: string
	async login(user: any) {
		// const payload = { username: user.username, sub: user.user_id };
		const payload = { userid: user.userid };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
