import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostDTO } from "src/dto/post.dto";
import { PostObject } from "src/model/postData.model";

export class dataCasting {
	public static toPostData(executionResult: ExecutionResult): PostObject[]{
		if(executionResult.status !== 200){
			throw InternalServerErrorException;
		} else if(executionResult.data.length === 0 ){
			throw NotFoundException;
		}
		const result: PostObject[] = [];
		for(let idx = 0, len = executionResult.data.length; idx < len; idx++){
			const data:PostDTO = executionResult.data[idx] as PostDTO;
			let tempPost:PostObject = {
				id: data._id.toString(),
				createAt: data.created_at,
				content: data.content,
				user: {
					_id: data.user_id,
					name: data.username,
					Image:{ path: data.profile_image}
				},
				Images: []
			}
			result.push(tempPost);

		}

		return result;
	}
	public static parseJwt (token:string):Record<string, string> {
		var base64Url:string = token.split('.')[1];
		var base64:string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload:string = decodeURIComponent(Buffer.from(base64, "base64").toString("binary").split('').map(function(character) {
			return '%' + ('00' + character.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	};

}


// {
// 	"status":200,
// 	"data":[
// 		{
// 			"_id":2,
// 			"user_id":"aaa"
// 			,"content":"hi"
// 			,"heart_count":0
// 			,"created_at":"2021-11-30T10:28:17.000Z"
// 			,"profile_image":""
// 			,"username":"auser"
// 			,"password":"$2b$10$DpykKpT6VpLjBu7THIdqPOYPkyysr6ZW.YbleAVlUJSC06FaK7j7S",
// 			"email":"aa@aaa.com",
// 			"phone_number":"010-0000-0000",
// 			"birth_date":"1997-07-27T15:00:00.000Z"
// 			,"gender":"N",
// 			"is_deleted":"0",
// 			"is_oauth_register":"0"
// 		},{
// 			"_id":4,
// 			"user_id":"bbb",
// 			"content":"b content",
// 			"heart_count":0,"created_at":"2021-12-03T01:16:32.000Z","profile_image":"","username":"RI","password":"$2b$10$MfWvyJD7bCnBgZMrY2eUJO1O.qD/XArM0ujMFtMyOR3wH2qUYBhui","email":"yu@naver.com","phone_number":"010-0000-0000","birth_date":"2020-12-11T15:00:00.000Z","gender":"N","is_deleted":"0","is_oauth_register":"0"},{"_id":2,"user_id":"aaa","content":"a1","heart_count":0,"created_at":"2021-11-30T10:28:17.000Z","profile_image":"","username":"auser","password":"$2b$10$DpykKpT6VpLjBu7THIdqPOYPkyysr6ZW.YbleAVlUJSC06FaK7j7S","email":"aa@aaa.com","phone_number":"010-0000-0000","birth_date":"1997-07-27T15:00:00.000Z","gender":"N","is_deleted":"0","is_oauth_register":"0"}]}