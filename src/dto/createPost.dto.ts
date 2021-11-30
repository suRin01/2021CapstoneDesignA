import { OmitType } from "@nestjs/mapped-types";
import { PostDTO } from "./post.dto";

export class CreatePostDTO extends OmitType(PostDTO, [
	"_id",
	"created_at",
] as const) {}
