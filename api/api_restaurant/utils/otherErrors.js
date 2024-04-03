const logger = require('./winston');
const {sendMail} = require('./mail');
const os = require('os');

exports.uncaught=()=>{
    process.on('uncaughtException',err=>{
        logger.error(err.stack)
        logger.info('Shutting down server due to uncaught exception')
        // sendMail(process.env.LOG_MAIL,err.stack,err.stack,"Error uncaughtException in API in" +os.hostname()).catch(e => {
        //     process.exit(1);
        // })
    })
}

exports.unhandled=(server)=>{
    process.on('unhandledRejection',err => {
        logger.error(err.message)
        logger.info('Shutting down server due to Unhandled Promise rejection')
        // sendMail(process.env.LOG_MAIL,err.stack,err.stack,"Error unhandledRejection in API in" +os.hostname()).catch(e => {
        //     process.exit(1);
        // })
    })
}