"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class HospitalInsurance extends Model {
    static associate(models) {}
  }
  HospitalInsurance.init(
    {},
    {
      sequelize,
      modelName: "HospitalInsurance",
      timestamps: false,
    }
  );
  return HospitalInsurance;
};
