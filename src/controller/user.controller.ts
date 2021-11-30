import { Get, Controller, Post, Body, Param, Patch } from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { executionResult } from "src/dto/executionResult.dto";
import { CreateUserDTO } from "../dto/createUser.dto";

@Controller("user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<executionResult> {
		console.log(await this.userService.getUser(id));
		return await this.userService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: CreateUserDTO): Promise<executionResult> {
		return await this.userService.createUser(user);
	}

	@Patch("/:id")
	async patchUser(
		@Param("id") user: CreateUserDTO,
	): Promise<executionResult> {
		await this.userService.deleteUser(user.user_id);

		return await this.userService.createUser(user);
	}
}
