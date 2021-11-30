import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}
	// validate(username: string, password: string): Promise<any>
	async validate(userid: string, password: string): Promise<any> {
		const result: any = await this.authService.validate(userid, password);
		console.log(result);
		if (!result) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
