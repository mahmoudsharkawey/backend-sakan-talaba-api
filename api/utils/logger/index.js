import winston from "winston";

const { combine, timestamp, json, colorize, printf } = winston.format;

const developmentFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level}: ${message}${metaString}`;
  })
);

const productionFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: "info",
  format: developmentFormat,
  transports: [new winston.transports.Console()],
});

export const httpLogStream = {
  write: (message) => (logger.http ? logger.http(message.trim()) : logger.info(message.trim())),
};

export default logger;


