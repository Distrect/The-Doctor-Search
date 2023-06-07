import DoctorNotFoundError from "../error/error.js";
import Controller from "./ControllerBase.js";

class DoctorController extends Controller {
  constructor() {
    super();
    this.addRoute("GET", "/:id", this.getSingleDoctor);
  }
  getSingleDoctor = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new DoctorNotFoundError();
      const key = `user-id${id}`;

      const result = await this.Cacher.get(
        key,
        this.DoctorModel.getDoctor.bind(null, id)
      );
      res.status(201).json({ ok: true, result });
    } catch (error) {
      console.log("Single Doctor Error", error);
      next(error);
    }
  };
}

const doctorController = new DoctorController();

export default doctorController;
