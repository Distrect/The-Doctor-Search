import Controller from "./ControllerBase.js";

class SearchController extends Controller {
  constructor() {
    super();
    this.addRoute("POST", "/search", this.searchDoctors);
  }
  searchDoctors = async (req, res, next) => {
    try {
      const { querry } = req.body;
      const result = await this.DoctorModel.searchDoctor(querry.trim());
      res.status(201).json({ ok: true, result });
      console.log(result, result.length);
    } catch (error) {
      console.log("search error", error);
      next(error);
    }
  };
}

const SearchControl = new SearchController();

export default SearchControl;
