import { OmitType, PartialType } from "@nestjs/mapped-types";
import { UserDTO } from "./user.dto";

export class UpdateUserDTO extends PartialType(
	OmitType(UserDTO, ["_id", "created_at"] as const),
) {}
