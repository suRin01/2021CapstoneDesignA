import {
	Get,
	Controller,
	Post,
	Render,
	UseGuards,
	Request,
	Res,
	Redirect,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { executionResult } from "src/dto/executionResult.dto";
import { UserDTO } from "src/dto/user.dto";

import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@Render("login")
	async getUser() {
		return;
	}

	@UseGuards(AuthGuard("local"))
	@Redirect("/", 302)
	@Post()
	async login(
		@Request() req,
		@Res({ passthrough: true }) res,
	): Promise<any> {
		const userData: UserDTO = req.user.data[0] as UserDTO;

		const jwtToken = this.authService.getAccessToken({
			sub: userData._id.toString(),
			username: userData.user_id
		});

		
		res.cookie("Authorization", jwtToken.access_token, {
			httpOnly: true,
		});
		res.cookie("Refresh", jwtToken.refresh_token, {
			httpOnly: true,
		});
		return;
	}
}
