require('dotenv').config()
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack ? `\nStack trace: ${stack}` : ''}`
})

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/subserver-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '7d'
    }),
    new DailyRotateFile({
      filename: 'logs/subserver-info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '7d' // Keep logs for the last 14 days
    }),
  ]
})

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack })
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`, { promise, stack: reason.stack })
})

module.exports = logger
