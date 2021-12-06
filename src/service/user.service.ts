import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { dateParser } from "../util/dateParser";
import { CreateUserDTO } from "../dto/createUser.dto";
import * as bcrypt from "bcrypt";

import { oauth2_v2 } from "googleapis";
import { WinstonLogger } from "src/util/logger";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}

	async getUser(id: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.findOne, [id]);
	}

	async createUser(user: CreateUserDTO): Promise<ExecutionResult> {
		// eslint-disable-next-line @typescript-eslint/no-inferrable-types
		const saltRound: number = 10;

		const salt: string = await bcrypt.genSalt(saltRound);
		const hashedPassword: string = await bcrypt.hash(user.password, salt);
		WinstonLogger.getInstance().info("Create New User");
		return await this.mapper.mapper(userQueryString.createOne, [
			user.user_id,
			user.profile_image,
			user.username,
			hashedPassword,
			user.email,
			user.phone_number,
			dateParser.dbDateFormatter(user.birth_date),
			user.gender,
		]);
	}

	// async updateUser(user: UpdateUserDTO): Promise<executionResult> {
	// 	return await this.mapper.mapper(userQueryString.updateOne, [user.username, user.id, user.password]);
	// }

	async deleteUser(userID: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.deleteOne, [userID]);
	}

	async createOauthUser(
		userProfile: oauth2_v2.Schema$Userinfo,
	): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.createOautOne, [
			userProfile.name,
			userProfile.id,
			userProfile.email,
			"1",
		]);
	}
}
