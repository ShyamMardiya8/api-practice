const express = require("express")
const db = require("./app/connections/db")
const http = require("http")
const router = require('./app/routes/routes')
const { green, bold, yellow, reset, white, magenta, blue, cyan } = require("./app/utils/colors")



const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

db()

app.use('/api', router)

app.listen(port, () => {
console.log(`\n${green}${bold}🚀 Server Status: ${yellow}Running${reset}`);
    console.log(`${blue}${bold}🌐 URL: ${cyan}http://localhost:${port}${reset}`);
    console.log(`${magenta}${bold}📅 Started on: ${white}${new Date().toLocaleString()}${reset}`);
    console.log(`${green}────────────────────────────────────────────${reset}\n`);

})