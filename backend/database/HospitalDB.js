import db from "../src/models/index.js";
const { Hospital, Sequelize } = db;

class HospitalDB {
  createHospital = async (hospital) => {
    return await Hospital.create(hospital).catch((err) => {
      throw err;
    });
  };

  getCities = async () => {
    return await Hospital.findAll({
      raw: true,
      attributes: [Sequelize.fn("DISTINCT", Sequelize.col("city")), "city"],
    });
  };
}

const Hospitalmodel = new HospitalDB();

export default Hospitalmodel;
