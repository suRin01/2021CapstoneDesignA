
import mysql from "mysql2/promise";
import { logger } from "../util/winston";
import "dotenv/config";


export class database{
	private pool:mysql.Pool
	constructor(){
		this.pool = mysql.createPool({ 
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			connectionLimit: 5
		});
		logger.info("Mysql connection pool created.");
	}
	
    
	public getConnection = async ():Promise<mysql.PoolConnection | undefined> => {
		return await this.pool.getConnection()
			.catch((err: Error)=>{
				logger.error("Mysql connection pool creation failed.");
				logger.error(err);
				return undefined;
			});
	}

}