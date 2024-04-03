const {uncaught,unhandled} = require('./utils/otherErrors')
uncaught();
const path  = require('path')

require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const db = require('./config/database')

const app = require('./app')

function main() {
    const server = app.listen(app.get('port'),()=>{
        console.log(`Techincal Design API running at ${app.get('port')} port in ${process.env.NODE_ENV} mode`)
    });
    unhandled(server)
}

main();
