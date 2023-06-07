import ServerModule from "./express/server.js";
import Database from "./database/Database.js";
import PrettyError from "pretty-error";
import dotenv from "dotenv";
import Registerer from "./classes/Hospital.js";
import doctorController from "./controller/doctorController.js";
import FilterControl from "./controller/filterController.js";
import SearchControl from "./controller/searchController.js";
import adminController from "./controller/adminController.js";
import { exec } from "child_process";
import db from "./src/models/index.js";
import { Op, Sequelize } from "sequelize";

dotenv.config();
PrettyError.start();

const Server = new ServerModule(process.env);

await Database.initDatabase();
process.env.dev_mode === "prod" && (await Registerer.startScrappingProcess());
Server.initDependencies();

Server.addRoute("/doctor", doctorController.getRoute());
Server.addRoute("/filters", FilterControl.getRoute());
Server.addRoute("/search", SearchControl.getRoute());
Server.addRoute("/admin", adminController.getRoute());
Server.initRoutes();

export default Server;
