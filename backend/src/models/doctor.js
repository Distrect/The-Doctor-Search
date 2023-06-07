"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      const { Doctit, Title, Hospital, HospitalDoctor } = models;

      this.belongsToMany(Title, {
        sourceKey: "doctorId",
        foreignKey: "doctor_id",
        as: "doctortitles",
        through: Doctit,
      });

      this.belongsToMany(Hospital, {
        sourceKey: "doctorId",
        foreignKey: "doctor_id",
        as: "doctorhospital",
        through: HospitalDoctor,
      });
    }
  }
  Doctor.init(
    {
      doctorId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      middlename: DataTypes.STRING,
      surname: DataTypes.STRING,
      speciality: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      imageSrc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
