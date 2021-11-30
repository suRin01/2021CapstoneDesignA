import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreatePostDTO } from "../dto/createPost.dto";
import { executionResult } from "src/dto/executionResult.dto";
import { PostService } from "../service/post.service";

@Controller("post")
export class PostController {
	constructor(private postService: PostService) {}

	@Get("/:idx")
	async getPost(@Param("idx") idx: string): Promise<executionResult> {
		return await this.postService.getPost(idx);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createPost(@Body() post: CreatePostDTO): Promise<executionResult> {
		return await this.postService.createPost(post);
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/:idx")
	async deletePost(@Param("idx") idx: string): Promise<executionResult> {
		return await this.postService.deletePost(idx);
	}
}
