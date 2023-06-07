"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Title extends Model {
    static associate(models) {
      const { Doctor, Doctit } = models;

      this.belongsToMany(Doctor, {
        sourceKey: "titleId",
        foreignKey: "title_id",
        through: Doctit,
      });
    }
  }
  Title.init(
    {
      titleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Title",
      timestamps: false,
    }
  );
  return Title;
};
