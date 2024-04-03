const mongoose = require('mongoose');
const os = require('os');
const logger = require('../utils/winston')
const {sendMail} = require('../utils/mail')

const uri = process.env.DATABASE || 'mongodb://localhost:27017/api_restaurant';
mongoose.set('strictQuery', true);
mongoose.connect(uri)
.then(db=> console.log(`Database Mongodb connected!!! to ${uri}`))
.catch(err=>logger.error(err))

mongoose.connection.on('disconnected', err => {
  const body = `Mongo database is disconnected in ${os.hostname()}`
    sendMail(process.env.LOG_MAIL,body,body,"Mongodb conection is lose").catch(e => {
  })
  logger.error('Mongo database is disconnected');
});