import { IsDate, IsNumber, IsString } from "class-validator";
import { UserDTO } from "./user.dto";

export class PostDTO {
	@IsNumber()
	_id: number;
	@IsString()
	user_id: string;
	@IsString()
	content: string;
	@IsNumber()
	heart_count: number;
	@IsDate()
	created_at: Date;
}

export class executionResult {
	status: number;
	data: Array<PostDTO | UserDTO>;
}
