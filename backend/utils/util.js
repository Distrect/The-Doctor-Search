import Doctor from "../classes/Doctor.js";
import hash from "./Categories.js";
import zlib from "zlib";
import { hashedTitles } from "../constants/institutions.js";
import { closest, distance } from "fastest-levenshtein";
import { Op, literal } from "sequelize";

const reduceSpecialities = (str) => {
  str = str
    .split(" ")
    .map((s) =>
      s !== "ve"
        ? s[0].toLocaleUpperCase("tr-TR") +
          s.substring(1).toLocaleLowerCase("tr-TR")
        : "ve"
    )
    .join(" ");

  str = str.replace(/Klinik|Medikal/g, "").trim();
  const dhRegex = /^İç Hastalık/g;
  const trIndex = str.search(/-|Sağlığı Merkezi|Sorumlu Hekim|Doktoru/g);
  if (dhRegex.test(str)) return "Dahiliye";
  if (trIndex !== -1) return str.substring(0, trIndex).trim();
  return str.trim();
};

export const levensteinDistributor = (str) => {
  let speciality = reduceSpecialities(str);
  const arr = hash[speciality[0]];
  return closest(speciality, arr);
};

export const compressJSON = (obj) => {
  const stringifiedJSON = JSON.stringify(obj);
  const compressed = zlib.gzipSync(stringifiedJSON);
  return compressed;
};

export const decompressJSON = (compressed) => {
  const decompressed = zlib.gunzipSync(compressed);
  return JSON.parse(decompressed);
};

export const querybuilder = (str) => {
  const caseObj = {};
  let arr = [];
  const attributes = ["name", "middlename", "surname" /*, "speciality"*/];
  const splittedString = str.split(" ");

  const literalArr = splittedString.map((s, i) => {
    let index = i === 1 ? 2 : i;
    return [literal(`${attributes[index]} like '${s + "%"}'`), "DESC"];
  });

  const query = attributes.map((attr) => {
    splittedString.map((s) => {
      arr.push({ [attr]: { [Op.like]: /* "%" +*/ s + "%" } });
      caseObj[attr] = { [Op.like]: "%" + s + "%" };
    });
  });

  return [{ [Op.or]: arr }, literalArr];
};

export const checkObjectEmpty = (obj) => {
  return Object.entries(obj).length === 0;
};

export const formatQuery = (queryObj) => {
  const { speciality, title, city, insurance, rating, page, sort } = queryObj;
  const newQuery = {};

  if (page) {
    newQuery["page"] = page;
  }

  if (sort) {
    newQuery["sort"] = sort;
  }

  if (speciality?.length) {
    newQuery["speciality"] = { [Op.or]: speciality };
  }

  if (title?.length) {
    newQuery["title"] = title;
  }

  if (city?.length) {
    newQuery["city"] = { [Op.or]: city };
  }

  if (insurance?.length) {
    newQuery["insurance"] = { [Op.or]: insurance };
  }

  if (rating) {
    newQuery["rating"] = { [Op.gte]: rating };
  }

  return newQuery;
};

export const getTitleIds = (titles) =>
  titles.map((title) => hashedTitles[title]);

export const createDoctorInstance = (obj) => {
  const { name, middlename, surname, speciality, titles, phone, city, email } =
    obj;

  return new Doctor(
    titles,
    name,
    middlename,
    surname,
    phone,
    city,
    speciality,
    email
  );
};
// console.log(querybuilder("Samet Sarıçiçek"));

/*
BUNU SAKIN SİLME
export const formatQuery = (queryObj) => {
  const newObj = {};

  Object.entries(queryObj).forEach(([key, val], i) => {
    if (key === "q") {
      newObj[key] = querybuilder(val);
      return;
    }

    if (key === "page") {
      newObj[key] = +val;
      return;
    }

    let newVal = val.split("-");
    newObj[key] = { [Op.or]: newVal };
    console.log(newObj);
  });

  return newObj;
};

*/
