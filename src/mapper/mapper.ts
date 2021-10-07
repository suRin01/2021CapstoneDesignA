import mysql from "mysql2/promise";
import {database} from "../util/database";
import { logger } from "../util/winston";
interface rowData{
	idx: number;
	pageId: string;
	companyName: number;
	companyAddress: string;
	hiringPosition: string;
}

interface executionResult {
    status: number;
    data: Array<rowData>;
}




export class mapper{
	private db:database;
	constructor(){
		this.db = new database();
		logger.info("Database connection created");

	}
	public mapper = async (query: string, data:string[] = []): Promise<executionResult> =>{
		//Get database Connection
		const conn:mysql.PoolConnection|undefined = await this.db.getConnection();
		if(conn === undefined){
			logger.error("database connection failed.");
			return {status: 500, data: []};
		}
	
		//Excute query
		const result:void | [mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader, mysql.FieldPacket[]] = await conn.query(
			query,
			data
		)
			.catch((err: Error)=>{
				logger.error("Query execution failed");
				logger.error(err);
			});
	
		//Relase connection and return 
		try{
			conn.release();
		}
		catch(err){
			console.log(err);
		}
	
		const resultArr: Array<rowData> = [];
		//Return result
		if(Array.isArray(result)){
			if(result !== undefined){
				for(let idx = 0, len = (result[0] as any[]).length; idx< len; idx++){
					const tempResult = (result[0] as any[])[idx];
					resultArr.push({idx:tempResult.idx , pageId:tempResult.page_id, companyName:tempResult.company_name, companyAddress:tempResult.company_address, hiringPosition: tempResult.hiring_position});
				}
	
			}
			logger.info("Query execution success");
			return {status: 200, data: resultArr};
		}
		else if(result !== undefined){
			logger.info("Query execution success with no returning data");
			return {status: 200, data: []};
		}
		else{
			logger.error("Query execution failed");
			return {status: 500, data: []};
		}
	}
}