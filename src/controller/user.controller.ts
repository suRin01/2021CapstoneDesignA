import { Get, Controller, Post, Body, Param, Patch } from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { ExecutionResult } from "src/dto/executionResult.dto";
import { CreateUserDTO } from "../dto/createUser.dto";

@Controller("api/user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<ExecutionResult> {
		console.log(await this.userService.getUser(id));
		return await this.userService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: CreateUserDTO): Promise<ExecutionResult> {
		return await this.userService.createUser(user);
	}

	@Patch("/:id")
	async patchUser(
		@Param("id") user: CreateUserDTO,
	): Promise<ExecutionResult> {
		await this.userService.deleteUser(user.user_id);

		return await this.userService.createUser(user);
	}
}
