import { PostDTO } from "./post.dto";
import { UserDTO } from "./user.dto";

export class executionResult {
	status: number;
	data: Array<UserDTO | PostDTO>;
}
