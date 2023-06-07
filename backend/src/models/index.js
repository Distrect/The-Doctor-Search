"use strict";

import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requir = createRequire(import.meta.url);
const fs = requir("fs");
//const path = require("path");
const Sequelize = requir("sequelize");
const process = requir("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = requir(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = await fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    file.indexOf(".test.js") === -1
  );
});

for (const file of files) {
  await import("file://" + path.join(__dirname, file)).then((module) => {
    const model = module.default(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  });
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

// const model = requir(path.join(__dirname, file))(
//   sequelize,
//   Sequelize.DataTypes
// );
// db[model.name] = model;

/*
files.forEach(async (file) => {
  await import("file://" + path.join(__dirname, file)).then((module) => {
    const model = module.default(sequelize, Sequelize.DataTypes);
    console.log(model.name);
    db[model.name] = model;
  });
  console.log(db.Doctor, db.Title, db.Phone);
});
*/
