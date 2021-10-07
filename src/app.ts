import express from "express";
import "dotenv/config";
import {jobRouter} from "./routes/jobRouter";
import {commandRouter} from "./routes/commandRouter";
import {logger} from "./util/winston";


export class server{
	private port: string|undefined = process.env.PORT;
	private app: express.Express = express();
	
	public start = (): void =>{
		this.app.use(express.json());
		this.app.use(express.urlencoded());
		this.app.use("/", jobRouter);
		this.app.use("/", commandRouter);


		this.app.listen(this.port, ()=>{
			logger.info(`Start Server on localhost:${this.port}`);
			console.log(`Start Server on localhost:${this.port}`);
		});
		
	}

}


const instance:server = new server;
instance.start();