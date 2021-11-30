import {
	Get,
	Controller,
	Post,
	Body,
	Param,
	Patch,
	Render,
	UseGuards,
	Request,
	Session,
	Res,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { session } from "passport";

import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@Render("login")
	async getUser() {
		return { message: "hi" };
	}

	@UseGuards(AuthGuard("local"))
	@Post()
	async login(
		@Session() session,
		@Request() req,
		@Res({ passthrough: true }) response,
	): Promise<any> {
		console.log("req.user:", req.user);
		console.log("req.user.data[0]:", req.user.data[0].user_id);

		// return "success";
		return this.authService.login({
			userid: req.user.data[0].user_id, //req.userid,
		});
		// return this.authService.login({
		// 	useranme: req.username,
		// 	sub: req.userpw,
		// });
	}
}
