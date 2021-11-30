import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { UserModule } from "./modules/user.module";
import { PostModule } from "./modules/post.module";

@Module({
	imports: [UserModule, AuthModule, PostModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
