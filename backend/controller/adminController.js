import { validateForm } from "../middlewares/formValidator.js";
import { createDoctorInstance, getTitleIds } from "../utils/util.js";
import Controller from "./ControllerBase.js";

class AdminController extends Controller {
  constructor() {
    super();
    this.addRoute("POST", "/login", validateForm("login", this.login));
    this.addRoute("POST", "/addDoctor", validateForm("doctor"), this.addDoctor);
    this.addRoute("POST", "/updateDoctor/:id", this.updateDoctor);
    /*this.addRoute("/deleteDoctor/:id");
    this.addRoute("/getDoctor");
    */
  }

  login = async (req, res, next) => {
    try {
      const admin = this.AdminModel.login(req.body);
      res.status(201).json({ ok: true, message: "Successfully logged in" });
    } catch (error) {
      console.log("Login err", error);
      next(error);
    }
  };

  addDoctor = async (req, res, next) => {
    try {
      const titleIds = getTitleIds(titles);
      const newDoctor = await this.DoctorModel.createDoctor(
        createDoctorInstance(req.body),
        hospitalIds,
        titleIds
      );
      res
        .status(201)
        .json({ ok: true, message: "New Doctor Succesfully added", newDoctor });
    } catch (error) {
      console.log("Error", error);
    }
  };

  deleteDoctor = async (req, res, next) => {
    try {
      const id = req.param;
      const isDeleted = await this.DoctorModel.deleteDoctor(id);
      res
        .status(201)
        .json({ ok: true, message: "The Doctor Has been deleted" });
    } catch (error) {
      console.log("dELETE ERROR");
    }
  };

  updateDoctor = async (req, res, next) => {
    try {
      const doctorId = req.params;
      const isUpdated = await this.DoctorModel.updateDoctor({
        doctorId,
        ...req.body,
      });

      res.status(201).json({ ok: true, message: "The Doctor is updated" });
    } catch (error) {
      console.log("Update doctor error", error);
      next(error);
    }
  };
}

const adminController = new AdminController();

export default adminController;
