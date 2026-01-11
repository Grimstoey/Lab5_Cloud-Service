import express, { Request, Response } from "express";
import eventRoute from "./routes/EventRoute";
import path from "path";
import cors, {CorsOptions} from 'cors';

const app = express();
const webApp = express();

const port = 3000;
const webPort = 5050;

const corsOptions:CorsOptions = {
   origin: ['http://localhost:5050'],
   methods: ['GET','POST','OPTIONS'],
   allowedHeaders: ['Content-Type','Authorization'],


};


app.use(express.json());
webApp.use(express.static(path.join(process.cwd())));
app.use(cors(corsOptions));


app.use("/events", eventRoute);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

webApp.listen(webPort, () => {
  console.log(`WebApp listening at http://localhost:${webPort}`);
});
