"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Insurance extends Model {
    static associate(models) {
      const { Hospital, HospitalInsurance } = models;

      this.belongsToMany(Hospital, {
        sourceKey: "insuranceId",
        foreignKey: "doctor_id",
        through: HospitalInsurance,
      });
    }
  }
  Insurance.init(
    {
      insuranceId: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      insurance: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Insurance",
    }
  );
  return Insurance;
};
