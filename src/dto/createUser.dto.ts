import { OmitType } from "@nestjs/mapped-types";
import { UserDTO } from "./user.dto";

export class CreateUserDTO extends OmitType(UserDTO, [
	"_id",
	"created_at",
] as const) {}
