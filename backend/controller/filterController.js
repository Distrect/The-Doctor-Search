import Controller from "./ControllerBase.js";
import { checkObjectEmpty, formatQuery } from "../utils/util.js";

class FilterController extends Controller {
  constructor() {
    super();
    this.addRoute("GET", "/getfilters", this.getFilters);
    this.addRoute("POST", "/getdoctors", this.filterDoctors);
  }

  getFilters = async (req, res, next) => {
    try {
      const result = await this.Cacher.get(
        "filters",
        async () =>
          await Promise.all([
            this.DoctorModel.getSpecialities(),
            this.TitleModel.getTitles(),
            this.Hospitalmodel.getCities(),
            this.InsuranceModel.getInsurances(),
          ])
            .then((res) => ({
              specialities: ["Uzmanlık", res[0]],
              titles: ["Unvan", res[1]],
              citites: ["Şehir", res[2]],
              insurances: ["Sigorta", res[3]],
            }))
            .catch((err) => {
              throw err;
            })
      );

      res.status(201).json({ ok: true, result });
    } catch (error) {
      console.log("Filter Errors", error);
      next(error);
    }
  };

  filterDoctors = async (req, res, next) => {
    console.log("fisrt query", req.body);

    try {
      if (checkObjectEmpty(req.body)) {
        console.log("x");
        return res.status(201).json({ ok: true, result: [] });
      }

      /* if (req.body.querry) {
        const result = await this.DoctorModel.searchDoctor(req.body.querry);
        res.status(201).json({ ok: true, result });
      }*/

      const result = await this.DoctorModel.filterDoctor(formatQuery(req.body));
      // console.log(result.count, result.rows.length);
      res.status(201).json({ ok: true, result });
    } catch (error) {
      console.log("Filter Doctors error:", error);
      next(error);
    }
  };
}

const FilterControl = new FilterController();

export default FilterControl;
