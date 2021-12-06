import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule); // 메소드에 유형을 전달하면 app 객체는 해당 특정 플랫폼에서만 사용할 수 있는 메소드를 갖게 됩니다. 그러나 실제로 기본 플랫폼 API에 액세스하려는 경우를 제외하고는 유형을 지정할 필요는 없습니다.

	app.enableCors({
		origin: "http://localhost:3000",
		credentials: true
	});
	// whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
	// forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
	// transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useStaticAssets(join(__dirname, "..", "public"));
	app.setBaseViewsDir(join(__dirname, "..", "views"));

	app.setViewEngine("hbs");


	await app.listen(8080);
}
bootstrap();

// https://1drv.ms/u/s!Ajg9s_4mZeFglU3HdZ2kYjZztQDL
// 테이블 구조 정리, 이후 페이지 작동 절차 정리
