import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { UserModule } from "./modules/user.module";
import { PostModule } from "./modules/post.module";
import { MainModule } from "./modules/main.module";
import { GoogleAuthenticationModule } from "./modules/googleAuthentication.module";
import { CommentModule } from "./modules/comment.module";
import { LikeModule } from "./modules/like.module";

@Module({
	imports: [
		UserModule,
		AuthModule,
		PostModule,
		MainModule,
		GoogleAuthenticationModule,
		CommentModule,
		LikeModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
