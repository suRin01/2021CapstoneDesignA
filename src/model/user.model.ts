import { IsBoolean, IsNumber, IsString } from "class-validator";

export default class User {
	@IsNumber()
	public readonly id?: number;
	@IsString()
	public readonly email?: string;
	@IsString()
	public readonly phoneNumber?: string;
	@IsString()
	public readonly profileImage?: string;
	@IsString()
	public readonly name: string;
	@IsString()
	public readonly password?: string;
	@IsBoolean()
	public readonly isRegisteredWithGoogle?: boolean;
	@IsString()
	public readonly currentHashedRefreshToken?: string;
	@IsBoolean()
	public readonly isEmailConfirmed?: boolean;
}
