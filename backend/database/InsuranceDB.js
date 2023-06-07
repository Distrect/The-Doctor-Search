import db from "../src/models/index.js";
const { Insurance, Sequelize } = db;

class InsuranceDB {
  createInsurancesinBulk = async (insurances) =>
    await Insurance.bulkCreate(insurances).catch((err) => {
      throw err;
    });

  getInsurances = async () => {
    return await Insurance.findAll({
      raw: true,
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("insurance")),
        "insurance",
      ],
    }).catch((err) => {
      throw err;
    });
  };
}

const InsuranceModel = new InsuranceDB();

export default InsuranceModel;
