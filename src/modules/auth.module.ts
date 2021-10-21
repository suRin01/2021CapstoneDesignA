import { Module } from "@nestjs/common";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { Mapper } from "../mapper/mapper";
import { LocalStrategy } from "../strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserServcie } from "src/service/user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWTSECRET,
			signOptions: { expiresIn: "60s" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserServcie, Mapper, LocalStrategy],
})
export class AuthModule {}
