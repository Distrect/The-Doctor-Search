"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Doctit extends Model {
    static associate(models) {}
  }
  Doctit.init(
    {},
    {
      sequelize,
      modelName: "Doctit",
      timestamps: false,
    }
  );
  return Doctit;
};
