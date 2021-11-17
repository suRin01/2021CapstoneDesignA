import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { executionResult, UserDTO } from "../dto/user.dto";
import { dateParser } from "../util/dateParser";
import { createUserDTO } from "../dto/createUser.dto";
import { UpdateUserDTO } from "../dto/updateUser.dto";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}

	async getUser(id: string): Promise<executionResult> {
		return await this.mapper.mapper(userQueryString.findOne, [id]);
	}

	async createUser(user: createUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(userQueryString.createOne, [
			user.name,
			user.id,
			user.profileImage,
			user.password,
			user.email,
			user.phoneNumber,
			dateParser.dbDateFormatter(user.birthDate),
			user.gender,
		]);
	}

	async updateUser(user: UpdateUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(userQueryString.updateOne, [
			user.name,
			user.id,
			user.profileImage,
			user.password,
			user.email,
			user.phoneNumber,
			dateParser.dbDateFormatter(user.birthDate),
			user.gender,
		]);
	}

	async deleteUser(userID: string): Promise<executionResult> {
		return this.mapper.mapper(userQueryString.deleteOne, [userID]);
	}
}
