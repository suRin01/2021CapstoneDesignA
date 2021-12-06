import { PostDTO } from "./post.dto";
import { UserDTO } from "./user.dto";

export class ExecutionResult {
	status: number;
	data: Array<UserDTO | PostDTO>;
}
