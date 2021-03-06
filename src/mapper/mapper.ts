import mysql from "mysql2/promise";
import "dotenv/config";

import { database } from "../util/db";
import { UserDTO } from "../dto/user.dto";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostDTO } from "src/dto/post.dto";
import { CommentDTO } from "src/dto/comment.dto";

export class Mapper {
	constructor(private db: database) {
		this.db = new database();
		console.log("Database connection created");
	}
	public mapper = async (
		query: string,
		data: (string | number)[] = [],
	): Promise<ExecutionResult> => {
		//Get database Connection
		const conn: mysql.PoolConnection | undefined =
			await this.db.getConnection();
		if (conn === undefined) {
			console.error("database connection failed.");
			return { status: 500, data: [] };
		}

		//Excute query
		const result:
			| void
			| [
					(
						| mysql.RowDataPacket[]
						| mysql.RowDataPacket[][]
						| mysql.OkPacket
						| mysql.OkPacket[]
						| mysql.ResultSetHeader
					),
					mysql.FieldPacket[],
			  ] = await conn.query(query, data).catch((err: Error) => {
			console.error("Query execution failed");
			console.error(err);
		});

		//Relase connection and return
		try {
			conn.release();
		} catch (err) {
			console.debug(err);
		}

		const resultArr: Array<UserDTO | PostDTO | CommentDTO> = [];
		//Return result
		if (Array.isArray(result) && result !== undefined) {
			for (
				let idx = 0, len = (result[0] as any[]).length;
				idx < len;
				idx++
			) {
				const tempResult = (result[0] as any[])[idx];
				const keyArray = Object.getOwnPropertyNames(tempResult);
				const putValue: any = {};

				keyArray.forEach((element) => {
					putValue[element] = tempResult[element];
				});
				resultArr.push(putValue);
			}
			console.debug("Query execution success");
			return {
				status: 200,
				data: resultArr,
				affectedRow: (result[0] as mysql.OkPacket).insertId,
			};
		} else {
			console.debug("Query execution failed");
			return { status: 500, data: [] };
		}
	};
}
