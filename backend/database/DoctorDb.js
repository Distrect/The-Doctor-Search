import { hashedInstutions } from "../constants/institutions.js";
import db from "../src/models/index.js";
import { querybuilder } from "../utils/util.js";
import Hospitalmodel from "./HospitalDB.js";
const { Doctor, Title, Hospital, Sequelize, Insurance, sequelize } = db;

class DoctorDb {
  limit = 12;

  bulkDoctor = async (data) => {
    try {
      for (const hosp of data) {
        const Hospital = await Hospitalmodel.createHospital(hosp);
        const newlyDoctors = await this.createDoctorinBulk(hosp.doctors);
        const hospitalInsuranceIds = hosp.institutions.map(
          (inst) => hashedInstutions[inst]
        );

        Hospital.addHospitalinsurances(hospitalInsuranceIds);
        Hospital.addHospitals(newlyDoctors);

        await Hospital.save();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  saveScrapped = async (hospital) => {
    try {
      console.log(hospital);
      const Hospital = await Hospitalmodel.createHospital(hospital);
      console.log(Hospital);
      const newlyDoctors = await this.createDoctorinBulk(hospital.doctors);
      const hospitalInsuranceIds = hospital.institutions.map(
        (inst) => hashedInstutions[inst]
      );

      Hospital.addHospitalinsurances(hospitalInsuranceIds);
      Hospital.addHospitals(newlyDoctors);

      await Hospital.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  createDoctorinBulk = async (doctors) => {
    doctors = doctors.filter((doc) => doc !== undefined);
    return await Doctor.bulkCreate(doctors)
      .then(async (res) => {
        let i = 0;
        for (const doc of res) {
          await doc.addDoctortitles(doctors[i].doctorTitles);
          i++;
        }
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  createDoctor = async (doctor, hopitalIds, titleIds) => {
    const transaction = sequelize.transaction;
    try {
      const newDoctor = await Doctor.create(doctor, { transaction });
      newDoctor.addDoctortitles(titleIds, transaction);
      hopitalIds || newDoctor.addDoctorhospital(hopitalIds, transaction);
      await newDoctor.save();
      await titleIds.commit();
      return newDoctor;
    } catch (error) {
      console.log("Doctor Create Error", error);
      await transaction.rollback();
      throw error;
    }
  };

  getDoctor = async (id) => {
    console.log("GETdOCR", id);
    return await Doctor.findOne({
      logging: false,
      include: [
        {
          required: true,
          model: Title,
          through: {
            attributes: [],
          },
          as: "doctortitles",
          attributes: ["title"],
        },
        {
          required: true,
          model: Hospital,
          through: {
            attributes: [],
          },
          as: "doctorhospital",
          include: {
            required: true,
            model: Insurance,
            as: "hospitalinsurances",
            through: {
              attributes: [],
            },
            attributes: ["insuranceId", "insurance"],
          },
        },
      ],
      where: { doctorId: id },
    })
      .then((res) => res.toJSON())
      .catch((err) => {
        throw err;
      });
  };

  getSpecialities = async () => {
    return await Doctor.findAll({
      raw: true,
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("speciality")),
        "speciality",
      ],
      order: [["speciality", "ASC"]],
    }).catch((err) => {
      throw err;
    });
  };

  filterDoctor = async (queryObj) => {
    console.log(queryObj);
    const { speciality, page, title, city, insurance, rating, sort } = queryObj;
    const paramHolder = {};
    console.log(sort);
    try {
      const resultQuery = {
        // logging: false,
        limit: this.limit,
        offset: (page - 1) * this.limit,
        ...(sort ? { order: [sort] } : {}),
        include: [
          {
            required: true,
            model: Title,
            attributes: ["title"],
            as: "doctortitles",
            ...(title ? { where: { title } } : {}),
          },

          {
            required: true,
            model: Hospital,
            attributes: ["city"],
            as: "doctorhospital",
            ...(city ? { where: { city } } : {}),
            ...(insurance
              ? {
                  include: {
                    required: true,
                    model: Insurance,
                    as: "hospitalinsurances",
                    where: { insurance },
                  },
                }
              : {}),
          },
        ],
        // order: [sort],
      };
      const countQuery = {
        logging: false,
        raw: true,
        attributes: [[Sequelize.literal("COUNT(DISTINCT(doctorId))"), "count"]],
        order: ["doctorId"],
        include: [
          {
            required: true,
            model: Title,
            attributes: ["title"],
            as: "doctortitles",
            attributes: [],
            through: { attributes: [] },
            ...(title ? { where: { title } } : {}),
          },
          {
            required: true,
            model: Hospital,
            attributes: ["city"],
            as: "doctorhospital",
            attributes: [],
            through: { attributes: [] },
            ...(city ? { where: { city } } : {}),
            ...(insurance
              ? {
                  include: {
                    attributes: [],
                    through: {
                      attributes: [],
                    },
                    required: true,
                    model: Insurance,
                    as: "hospitalinsurances",
                    where: { insurance },
                  },
                }
              : {}),
          },
        ],
      };

      if (speciality) {
        paramHolder["where"] = { ...paramHolder["where"], speciality };
      }

      if (rating) {
        paramHolder["where"] = { ...paramHolder["where"], rating };
      }

      const [rows, count] = await Promise.all([
        Doctor.findAll({ ...resultQuery, ...paramHolder }).then((res) =>
          res.map((r) => r.toJSON())
        ),
        Doctor.findAll({ ...countQuery, ...paramHolder }).then(
          (res) => res[0].count
        ),
      ]);

      // console.log(count, rows);
      return { rows, count };
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  searchDoctor = async (str) => {
    const [where, order] = querybuilder(str);
    console.log(order);
    return await Doctor.findAll({
      raw: true,
      required: true,
      where,
      limit: 5,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order,

      /*include: [
        {
          required: true,
          model: Title,
          attributes: ["title"],
          as: "doctortitles",
        },
        {
          required: true,
          model: Hospital,
          as: "doctorhospital",
          attributes: ["city"],
          include: [
            {
              required: true,
              model: Insurance,
              attributes: ["insurance"],
              as: "hospitalinsurances",
            },
          ],
        },
      ],*/
    }).then((res) => {
      // res.rows = res.rows.map((r) => r.toJSON());
      return res;
      // return res.map((res) => res.toJSON());
    });
  };

  deleteDoctor = async (doctorId) => {
    try {
      return await Doctor.destroy({ where: { doctorId } })
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
    } catch (error) {}
  };

  updateDoctor = async (updateDoctor) => {
    const { doctorId, ...rest } = updateDoctor;

    return await Doctor.update({ ...rest }, { where: { doctorId } })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };

  /* deleteDoctor = async (doctorId) => {
    return await Doctor.destroy({ where: doctorId })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };*/
}

const DoctorModel = new DoctorDb();

export default DoctorModel;

// attributes: [
//   "name",
//   "surname",
//   [Sequelize.fn("COUNT", Sequelize.col("doctortitles.title")), "title"],
// ],

// attributes: ["name", "surname", ["doctortitles", "title"]],

/*
    const titleParam = {
      ...ort,
      model: Title,
      as: "doctortitles",
      ...(title ? { where: { title } } : {}),
      attributes: ["title"],
    };
    const insuranceParam = {
      ...ort,
      model: Insurance,
      as: "hospitalinsurances",
      ...(insurance ? { where: { insurance } } : {}),
      attributes: ["insurance"],
    };
    const hospitalParam = {
      ...ort,
      model: Hospital,
      as: "doctorhospital",
      ...(title ? { where: { city } } : {}),
      attributes: ["city"],
    };
    */
// console.log(
//   q,
//   JSON.stringify({
//     ...doctorParam,
//     limit: this.limit,
//     offset: 0,
//     include: [titleParam, { ...hospitalParam, include: [insuranceParam] }],
//   })
// );

/*
{
      ...doctorParam,
      limit: this.limit,
      offset: 0,
      include: [titleParam, { ...hospitalParam, include: [insuranceParam] }],
    }
    */

/*


console.log(queryObj);
    const {
      sortby,
      sort,
      title,
      rating,
      speciality,
      city,
      insurance,
      q,
      page,
    } = queryObj;

    const doctorParam = {};

    if (sortby) doctorParam["order"] = [sortby, sort === true ? "ASC" : "DESC"];
    if (q) doctorParam["where"] = { ...q };

    if (rating)
      doctorParam["where"] = {
        ...doctorParam["where"],
        rating: { [Op.lte]: parseFloat(rating) },
      };

    if (speciality)
      doctorParam["where"] = {
        ...doctorParam["where"],
        speciality,
      };

    const resultQuerier = {
      limit: this.limit,
      offset: page * this.limit,
      include: [
        {
          required: true,
          model: Title,
          as: "doctortitles",
          attributes: ["title"],
          ...(title ? { where: { title } } : {}),
        },
        {
          required: true,
          model: Hospital,
          as: "doctorhospital",
          ...(title ? { where: { city } } : {}),
          attributes: ["city"],
          ...(insurance
            ? {
                include: [
                  {
                    model: Insurance,
                    as: "hospitalinsurances",
                    where: { insurance },
                    attributes: ["insurance"],
                  },
                ],
              }
            : {}),
        },
      ],
      ...doctorParam,
    };

    const countQuerier = {
      attributes: [[Sequelize.literal("COUNT(DISTINCT(doctorId))"), "count"]],
      include: [
        {
          required: true,
          model: Title,
          as: "doctortitles",
          attributes: [],
          through: { attributes: [] },
          ...(title ? { where: { title } } : {}),
        },
        {
          required: true,
          model: Hospital,
          as: "doctorhospital",
          ...(title ? { where: { city } } : {}),
          attributes: [],
          through: { attributes: [] },
          ...(insurance
            ? {
                include: [
                  {
                    model: Insurance,
                    as: "hospitalinsurances",
                    where: { insurance },
                    attributes: [],
                  },
                ],
              }
            : {}),
        },
      ],
      ...doctorParam,
    };

    const [mainQuery, countQuery] = await Promise.all([
      Doctor.findAll({
        ...resultQuerier,
      }).then((res) => res.map((r) => r.toJSON())),
      Doctor.findAll({
        raw: true,
        ...countQuerier,
        group: ["doctorId"],
      }).then((res) => res.length),
    ]);

    return { count: countQuery, rows: mainQuery };


*/

/*


console.log(queryObj);
      const {
        sortby,
        sort,
        title,
        rating,
        speciality,
        city,
        insurance,
        q,
        page,
      } = queryObj;

      const doctorParam = {};

      if (sortby)
        doctorParam["order"] = [sortby, sort === true ? "ASC" : "DESC"];
      if (q) doctorParam["where"] = { ...q };

      if (rating)
        doctorParam["where"] = {
          ...doctorParam["where"],
          rating: { [Op.lte]: parseFloat(rating) },
        };

      if (speciality)
        doctorParam["where"] = {
          ...doctorParam["where"],
          speciality,
        };

      console.log(doctorParam);

      const resultQuerier = {
        limit: this.limit,
        offset: page * this.limit,
        include: [
          {
            required: true,
            model: Title,
            as: "doctortitles",
            attributes: ["title"],
            ...(title ? { where: { title } } : {}),
          },
          {
            required: true,
            model: Hospital,
            as: "doctorhospital",
            ...(title ? { where: { city } } : {}),
            attributes: ["city"],
            ...(insurance
              ? {
                  include: [
                    {
                      model: Insurance,
                      as: "hospitalinsurances",
                      where: { insurance },
                      attributes: ["insurance"],
                    },
                  ],
                }
              : {}),
          },
        ],
        ...doctorParam,
      };

      console.log(resultQuerier);

      const countQuerier = {
        attributes: [[Sequelize.literal("COUNT(DISTINCT(doctorId))"), "count"]],
        include: [
          {
            required: true,
            model: Title,
            as: "doctortitles",
            attributes: [],
            through: { attributes: [] },
            ...(title ? { where: { title } } : {}),
          },
          {
            required: true,
            model: Hospital,
            as: "doctorhospital",
            ...(title ? { where: { city } } : {}),
            attributes: [],
            through: { attributes: [] },
            ...(insurance
              ? {
                  include: [
                    {
                      model: Insurance,
                      as: "hospitalinsurances",
                      where: { insurance },
                      attributes: [],
                    },
                  ],
                }
              : {}),
          },
        ],
        ...doctorParam,
      };

      const [mainQuery, countQuery] = await Promise.all([
        Doctor.findAll({
          ...resultQuerier,
        }).then((res) => res.map((r) => r.toJSON())),
        Doctor.findAll({
          raw: true,
          ...countQuerier,
          group: ["doctorId"],
        }).then((res) => res.length),
      ]);

      return { count: countQuery, rows: mainQuery };


*/

/*const countQuerier = {
        attributes: [[Sequelize.literal("COUNT(DISTINCT(doctorId))"), "count"]],
        include: [
          {
            required: true,
            model: Title,
            as: "doctortitles",
            attributes: [],
            through: { attributes: [] },
            ...(title ? { where: { title } } : {}),
          },
          {
            required: true,
            model: Hospital,
            as: "doctorhospital",
            ...(title ? { where: { city } } : {}),
            attributes: [],
            through: { attributes: [] },
            ...(insurance
              ? {
                  include: [
                    {
                      model: Insurance,
                      as: "hospitalinsurances",
                      where: { insurance },
                      attributes: [],
                    },
                  ],
                }
              : {}),
          },
        ],
        ...doctorParam,
      };*/
// if (title) {
//   paramHolder["where"] = { ...paramHolder["where"], title };
// }
