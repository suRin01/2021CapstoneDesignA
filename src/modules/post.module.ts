import { Module } from "@nestjs/common";
import { PostController } from "src/controller/post.controller";
import { Mapper } from "src/mapper/mapper";
import { PostService } from "src/service/post.service";
import { AuthModule } from "./auth.module";

@Module({
	imports: [AuthModule],
	controllers: [PostController],
	providers: [PostService, Mapper],
})
export class PostModule {}