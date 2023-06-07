"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Hospital extends Model {
    static associate(models) {
      const { Doctor, Insurance, HospitalDoctor, HospitalInsurance } = models;

      this.belongsToMany(Doctor, {
        sourceKey: "hospitalId",
        foreignKey: "hospital_id",
        as: "hospitals",
        through: HospitalDoctor,
      });

      this.belongsToMany(Insurance, {
        sourceKey: "hospitalId",
        foreignKey: "hospital_id",
        as: "hospitalinsurances",

        through: HospitalInsurance,
      });
    }
  }
  Hospital.init(
    {
      hospitalId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      hospitalName: DataTypes.STRING,
      city: DataTypes.STRING,
      url: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
      mail: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM("Ozel", "Devlet"),
        validate: {
          isIn: [["Ozel", "Devlet"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
