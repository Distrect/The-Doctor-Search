import AdminModel from "../database/AdminDB.js";
import DoctorModel from "../database/DoctorDb.js";
import Hospitalmodel from "../database/HospitalDB.js";
import InsuranceModel from "../database/InsuranceDB.js";
import TitleModel from "../database/TitleDB.js";
import Cache from "../utils/Caching.js";
import express from "express";

class Controller {
  Cacher = Cache;
  DoctorModel = DoctorModel;
  Hospitalmodel = Hospitalmodel;
  InsuranceModel = InsuranceModel;
  TitleModel = TitleModel;
  AdminModel = AdminModel;
  Route = express.Router();

  constructor() {
    this.methods = {
      GET: this.Route.get,
      POST: this.Route.post,
    };
  }

  addRoute = (method, endpoint, ...funcs) => {
    const routeMethod = this.methods[method];
    if (!routeMethod) throw new Error("Route cannot be undefined");
    this.Route[method.toLowerCase()](endpoint, ...funcs);
  };

  getRoute = () => this.Route;
}

export default Controller;
