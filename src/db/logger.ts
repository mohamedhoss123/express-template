import { Logger } from 'drizzle-orm/logger';
import winston from "winston"
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


export class WinstonLogger implements Logger {
    logQuery(query: string, params: unknown[]) {
        logger.info(`Executing query: ${query} with parameters: ${JSON.stringify(params)}`);
    }
}
