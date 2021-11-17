import { Optional } from "@nestjs/common";
import { IsDate, IsString } from "class-validator";

export class UserDTO {
	@IsString()
	idx: number;
	@IsString()
	name: string;
	@IsString()
	id: string;
	@IsString()
	profileImage: string;
	@IsString()
	password: string;
	@IsString()
	email: string;
	@IsString()
	phoneNumber: string;
	@IsDate()
	birthDate: Date;
	@IsString()
	gender: string;
	@IsDate()
	createdAt: Date;
}

export class executionResult {
	status: number;
	data: Array<UserDTO>;
}
