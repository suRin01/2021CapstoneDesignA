import { IsDate, IsNumber, isString, IsString } from "class-validator";

export class PostDTO {
	@IsNumber()
	public readonly _id: number;
	@IsString()
	public readonly user_id: string;
	@IsString()
	public readonly content: string;
	@IsNumber()
	public readonly heart_count: number;
	@IsDate()
	public readonly created_at: Date;
	@IsNumber()
	public readonly heartCount: number;
	@IsString()
	public readonly username: string;
	@IsString()
	public readonly isDeleted: string;
	@IsString()
	public readonly profile_image: string;

}
