import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import Registerer from "../classes/Hospital.js";
import Database from "../database/Database.js";

class ServerModule {
  #app;
  #PORT;

  constructor(environment) {
    this.#PORT = environment.PORT;
    console.log(this.#PORT, environment.PORT);
    this.#app = express();
    this.initDependencies();
  }

  initDependencies = () => {
    this.#app.use(cors({ credentials: true }));
    this.#app.use(helmet());
    this.#app.use(compression({ level: 1 }));
    this.#app.use(bodyParser.json());
    this.#app.use(cookieParser());

    this.#app.use(
      rateLimit({
        windowMs: 1000 * 60 * 5,
        max: 5000,
        message: "Rate limit has exceeded",
        standardHeaders: true,
        legacyHeaders: false,
      })
    );
  };

  initRoutes = () => {
    this.#app.listen(this.#PORT, () => {
      console.log("Serves has started at PORT", this.#PORT);
    });

    this.#app.get("/scrap", async (req, res, next) => {
      //await Database.restartAllTables();
      await Registerer.startScrappingProcess();
      res.status(201).json({ ok: true, scrapped: true });
    });

    this.#app.use((err, req, res, next) => {
      res.status(500).json({
        ok: false,
        err: "Should be rror definiton",
        message: "Server error",
        err: err.message,
      });
    }); //yaz bunu güzel laf
  };
  addRoute = (path, ...cbs) => {
    this.#app.use(path, ...cbs);
  };

  getApp = () => this.#app;
}

export default ServerModule;
