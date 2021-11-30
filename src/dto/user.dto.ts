import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { PostDTO } from "./post.dto";

export class UserDTO {
	@IsNumber()
	_id: number;
	@IsString()
	user_id: string;
	@IsString()
	profile_image: string;
	@IsString()
	username: string;
	@IsString()
	password: string;
	@IsString()
	email: string;
	@IsString()
	phone_number: string;
	@IsDate()
	@Type(() => Date)
	birth_date: Date;
	@IsString()
	gender: string;
	@IsDate()
	created_at: Date;
}

export class executionResult {
	status: number;
	data: Array<UserDTO | PostDTO>;
}
