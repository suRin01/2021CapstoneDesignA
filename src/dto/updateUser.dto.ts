import { Optional } from "@nestjs/common";
import { IsDate, IsString } from "class-validator";

export class UpdateUserDTO {
	@IsString()
	@Optional()
	name: string;
	@IsString()
	@Optional()
	id: string;
	@IsString()
	@Optional()
	profileImage: string;
	@IsString()
	@Optional()
	password: string;
	@IsString()
	@Optional()
	email: string;
	@IsString()
	@Optional()
	phoneNumber: string;
	@IsDate()
	@Optional()
	birthDate: Date;
	@IsString()
	@Optional()
	gender: string;
}
