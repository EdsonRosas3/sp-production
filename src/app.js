import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import {initialSetup} from "./libs";
import path from "path";



import { config } from "dotenv";
import Routes from './routes';
import db from "./models";

config();
(async () => {
  await db.sequelize.sync({ force: false });
  await initialSetup.createUsers();
  await initialSetup.createCategories();
  await initialSetup.createTypeServices();
})();


const app = express();


//view aplication;
app.use(express.static(path.join(__dirname,"/public")))


  

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
/* 
app.use(helmet());

 */
//app.use(express.urlencoded({ extended: false }));




// Route
app.use("/api",Routes);


export default app;
