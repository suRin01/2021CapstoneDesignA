import {
	Get,
	Controller,
	Post,
	Render,
	UseGuards,
	Request,
	Res,
	Redirect,
	Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDTO } from "src/dto/user.dto";

import { AuthService } from "../service/auth.service";

@Controller("api/auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard("local"))
	@Redirect("/", 302)
	@Post()
	async login(@Request() req, @Res({ passthrough: true }) res): Promise<any> {
		const userData: UserDTO = req.user.data[0] as UserDTO;

		const jwtToken = this.authService.getAccessToken({
			sub: userData._id.toString(),
			username: userData.user_id,
		});

		res.cookie("Authorization", jwtToken.access_token, {
			httpOnly: true,
		});
		res.cookie("Refresh", jwtToken.refresh_token, {
			httpOnly: true,
		});
		return;
	}

	@Delete("logout")
	async logout() {
		return;
	}
}
