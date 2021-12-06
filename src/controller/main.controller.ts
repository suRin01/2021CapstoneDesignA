import {
	Get,
	Controller,
	Render,
	UseFilters,
	Res,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { RequestUtility } from "src/util/req.util";

@Controller("/")
export class MainController {
	@Get()
	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	loginPage(@Res() res, @Req() req): void {
		const accessToken: string = RequestUtility.fromAuthCookie()(req);
		res.render("index", {
			isLogin: true,
			name: RequestUtility.parseJwt(accessToken).username,
		});

		return;
	}

	@Get("/test")
	@Render("oauthTest")
	test(): void {
		return;
	}
}
