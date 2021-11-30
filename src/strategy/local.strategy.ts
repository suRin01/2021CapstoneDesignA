import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { executionResult } from "src/dto/executionResult.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<executionResult> {
		const result: executionResult = await this.authService.validate(username, password);
		if (result.status === 401) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
