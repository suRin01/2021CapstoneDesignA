import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreatePostDTO } from "../dto/createPost.dto";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostService } from "../service/post.service";
import { dataCasting } from "src/util/response.util";
import { PostObject } from "src/model/postData.model";

@Controller("api/posts")
export class PostController {
	constructor(private postService: PostService) {}

	@Get("/:idx")
	async getPost(@Param("idx") idx: string, @Query("count") count:string = "10"): Promise<PostObject[]> {

		const result =  await this.postService.getPosts(idx, Number(count));

		return dataCasting.toPostData(result);
		

	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createPost(@Body() post: CreatePostDTO): Promise<ExecutionResult> {
		return await this.postService.createPost(post);
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/:idx")
	async deletePost(@Param("idx") idx: string): Promise<ExecutionResult> {
		return await this.postService.deletePost(idx);
	}
}
