import { toSaveInstutions, toSaveTitles } from "../constants/institutions.js";
import db from "../src/models/index.js";
import InsuranceModel from "./InsuranceDB.js";
import TitleModel from "./TitleDB.js";
const { sequelize, Sequelize } = db;

class DatabaseClass {
  initDatabase = async () => {
    try {
      await sequelize.authenticate().then((res) => {
        console.log("Database has started");
      });

      await sequelize
        .sync({ force: true })
        .then((res) => console.log("Tables has been synced"));

      const insurances = await InsuranceModel.createInsurancesinBulk(
        toSaveInstutions
      );
      const titles = await TitleModel.createTitleinBulk(toSaveTitles);

      return true;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  restartAllTables = async () =>
    await sequelize
      .sync({ force: true })
      .then((res) => console.log("Tables has been synced"));
}

const Database = new DatabaseClass();

export default Database;
