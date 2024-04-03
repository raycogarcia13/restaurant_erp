
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")
const router = express.Router()

const PORT =  process.env.PORT || 3000;

app.set('port',PORT)

const corsOption = require('./config/cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'100mb'}));
app.set('view engine', 'ejs');

app.use(router)

app.use('/api/v1',require('./router/auth/index'))
app.use('/api/v1/admin',require('./router/admin/user'))
app.use('/api/v1/admin',require('./router/admin/tables'))
app.use('/api/v1/admin',require('./router/admin/category'))
app.use('/api/v1/admin',require('./router/admin/products'))

//statics files
app.use('/',require('./router/views'));
app.use('/public',express.static(path.join(__dirname, "./public")));

const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)


module.exports = app;