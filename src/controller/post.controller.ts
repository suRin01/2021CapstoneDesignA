import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostService } from "../service/post.service";
import { dataCasting } from "src/util/response.util";
import { PostObject } from "src/model/postData.model";
import { RequestUtility } from "src/util/req.util";
import { CommentService } from "src/service/comment.service";
import { PostDTO } from "src/dto/post.dto";

@Controller("api/posts")
export class PostController {
	constructor(
		private postService: PostService,
		private readonly commentService: CommentService,
	) {}

	@Get("/")
	async getPosts(@Query("offset") offset: number): Promise<PostObject[]> {
		const result = await this.postService.getPosts(offset);

		for (let idx = 0, len = result.data.length; idx < len; idx++) {
			const postId: PostDTO = result.data[idx] as PostDTO;
			(result.data[idx] as PostDTO).comments = (
				await this.commentService.getComments(postId._id.toString())
			).data.length;
		}

		return dataCasting.toPostData(result);
	}

	@Get("/:idx")
	async getPost(@Param("idx") idx: string): Promise<PostObject[]> {
		const result = await this.postService.getPost(idx);

		return dataCasting.toPostData(result);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createPost(
		@Body() post: { content: string },
		@Req() req,
	): Promise<ExecutionResult> {
		const jwtTokenData: string = RequestUtility.fromAuthCookie()(req);
		const userData = RequestUtility.parseJwt(jwtTokenData);

		return await this.postService.createPost({
			user_id: userData.username,
			content: post.content,
		});
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/:idx")
	async deletePost(@Param("idx") idx: string): Promise<ExecutionResult> {
		return await this.postService.deletePost(idx);
	}
}
