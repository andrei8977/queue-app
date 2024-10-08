import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleWare implements NestMiddleware{
  private logger = new Logger('TIME LOGGER');
  
  use(request: Request, response: Response, next: NextFunction): void {
    
    const { method, originalUrl } = request;

    let time_start = new Date().toISOString()
    this.logger.log(`HTTP method: ${method}. Path: ${originalUrl}. Started  at ${time_start}`);

    response.on('finish', () => {
      const { statusCode } = response;
      let time_end = new Date().toISOString()
      this.logger.log(`HTTP method: ${method}. Path: ${originalUrl}. Finished at ${time_end}. StatusCode: ${statusCode}`);
    });

    next();
  }
}