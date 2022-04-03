/***
 * @author Sunil Timilsina
 * Listening Music
 */
 require('dotenv').config();
 require("./db/connection");
 
 
 const express = require("express");
 const path = require("path");
 const bodyParser = require('body-parser');
 const app = express();
 const routes = require("./routes");
 
 let port = process.env.PORT;
 
 // app.disable('x-powered-by');
 app.set('x-powered-by', false);
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 
 
 app.use("/api", routes);
 app.use(express.static(path.join(__dirname, "/public")));
 
 
 const server = app.listen(port, (req, res)=>{
     console.log(process.env.PORT_LISTENING_MSG + " " + server.address().port + ` http://localhost:${server.address().port}/api/`);
 });