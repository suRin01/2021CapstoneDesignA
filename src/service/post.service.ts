import { Injectable } from "@nestjs/common";
import { postQueryString } from "src/common/query";
import { CreatePostDTO } from "src/dto/createPost.dto";
import { executionResult } from "src/dto/executionResult.dto";
import { Mapper } from "../mapper/mapper";

@Injectable()
export class PostService {
	constructor(private readonly mapper: Mapper) {}

	async getPost(idx: string): Promise<executionResult> {
		return await this.mapper.mapper(postQueryString.findOne, [idx]);
	}

	async createPost(post: CreatePostDTO): Promise<executionResult> {
		return await this.mapper.mapper(postQueryString.createOne, [
			post.user_id,
			post.content,
		]);
	}

	async deletePost(idx: string): Promise<executionResult> {
		return await this.mapper.mapper(postQueryString.deleteOne, [idx]);
	}
}
