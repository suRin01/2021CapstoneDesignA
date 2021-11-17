import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class createUserDTO {
	@IsString()
	readonly name: string;
	@IsString()
	readonly id: string;
	@IsString()
	readonly profileImage: string;
	@IsString()
	readonly password: string;
	@IsString()
	readonly email: string;
	@IsString()
	readonly phoneNumber: string;

	@IsDate()
	@Type(() => Date)
	readonly birthDate: Date;
	@IsString()
	readonly gender: string;
}
