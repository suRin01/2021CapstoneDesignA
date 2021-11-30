import { IsDate, IsNumber, IsString } from "class-validator";

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
