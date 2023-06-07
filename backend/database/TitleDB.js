import db from "../src/models/index.js";
const { Title, Sequelize } = db;

class TitleDB {
  createTitleinBulk = async (titles) =>
    await Title.bulkCreate(titles).catch((err) => {
      throw err;
    });

  getTitles = async () => {
    return await Title.findAll({
      raw: true,
      attributes: [Sequelize.fn("DISTINCT", Sequelize.col("title")), "title"],
    }).catch((err) => {
      throw err;
    });
  };
}

const TitleModel = new TitleDB();

export default TitleModel;
