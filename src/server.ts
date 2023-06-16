import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

//uncaughtException Synchronous way te kaj kore
process.on('uncaughtException', error => {
  errorLogger.error(error);
  // console.log('💥 Uncaught Exception is detected....')
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('🛢 Database is connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`⏳ Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('💔 Failed to connect database', error);
  }

  process.on('unhandledRejection', error => {
    // console.log(
    //   '💥 Unhandled Rejection is detected, we are closing our server....'
    // )
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// SIGTERM=> SIG=signal, TERM = Terminate
// process.on('SIGTERM', error => {
//   logger.info('SIGTERM is received', error)
//   if (server) {
//     server.close()
//   }
// })
