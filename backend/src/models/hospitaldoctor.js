"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class HospitalDoctor extends Model {
    static associate(models) {}
  }
  HospitalDoctor.init(
    {},
    {
      sequelize,
      modelName: "HospitalDoctor",
      timestamps: false,
    }
  );
  return HospitalDoctor;
};
