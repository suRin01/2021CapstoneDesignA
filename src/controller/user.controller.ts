import {
	Get,
	Controller,
	Post,
	Body,
	Param,
	Patch,
	Req,
	UseGuards,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { ExecutionResult } from "src/dto/executionResult.dto";
import { CreateUserDTO } from "../dto/createUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestUtility } from "src/util/req.util";
import User from "src/model/user.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UserDTO } from "src/dto/user.dto";

@Controller("api/user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/me")
	async getMyUserData(@Req() req): Promise<Record<string, any>> {
		const jwtTokenData = RequestUtility.fromAuthCookie()(req);
		const payload = RequestUtility.parseJwt(jwtTokenData);

		const result = await this.userService.getUser(payload.username);
		const userData = (result.data as UserDTO[])[0];
		return {
			name: userData.username,
			_id: userData._id,
			Image: {
				path: userData.profile_image,
			},
			email: userData.email,
			birthday: userData.birth_date,
			gender: userData.gender,
		};
	}

	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<ExecutionResult> {
		console.log("user request");
		const data = await this.userService.getUser(id);
		return data;
	}

	@Post()
	@UseInterceptors(
		FileInterceptor("profileImage", {
			storage: diskStorage({
				destination: "./public/images",
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join("");
					cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	async createUser(
		@UploadedFile() file: Express.Multer.File,
		@Body() user: any,
	): Promise<ExecutionResult> {
		return await this.userService.createUser({
			user_id: user.id,
			profile_image: file.filename,
			username: user.name,
			password: user.password,
			email: user.email,
			phone_number: user.phone,
			birth_date: new Date(
				Number(user.year),
				Number(user.month),
				Number(user.day),
			),
			gender: user.gender,
		});
	}

	@Patch("/:id")
	async patchUser(
		@Param("id") user: CreateUserDTO,
	): Promise<ExecutionResult> {
		await this.userService.deleteUser(user.user_id);

		return await this.userService.createUser(user);
	}
}
