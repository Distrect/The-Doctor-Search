import puppeteer from "puppeteer";
import DoctorModel from "../database/DoctorDb.js";
import Doctor from "../classes/Doctor.js";
import { getTitleIds, levensteinDistributor } from "../utils/util.js";

process.setMaxListeners(20);

class Scrap {
  browser;
  page;
  DoctorModel = DoctorModel;

  scrapAll = async (hospitals) => {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });

      await Promise.all(
        hospitals.map(({ h, c }, i) => this.scrapHospital(h, c))
      ).then((res) => console.log(res));
      await this.browser.close();
    } catch (err) {
      //await this.finishScrapping();
      console.log("Scrapper Error", err);
      throw err;
    }
  };

  scrapHospital = async (hospital, callback) => {
    try {
      const { scrapurl } = hospital;
      console.log(hospital);
      const newPage = await this.browser.newPage();
      await newPage.goto(scrapurl, { waitUntil: "domcontentloaded" });
      const scrappedData = await newPage.evaluate(callback);
      const formattedData = await this.formatDoctor(scrappedData, hospital);
      hospital.doctors = formattedData;
      await DoctorModel.saveScrapped(hospital);
      await newPage.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  Scrap = async (Hospital, url, callback) => {
    try {
      const check = new URL(url);
      if (!url)
        throw new Error("The URL attribute is empty.Please specifiy a URL");

      if (typeof callback !== "function" || !callback)
        throw new Error(
          "The callback cannot be anything other than function. Please insert function"
        );
      await this.initPuppeter(url);
      const data = await this.startEvaulate(callback);
      await this.finishScrapping();
      const formattedData = this.formatDoctor(data, Hospital);
      Hospital.doctors = formattedData;
      return formattedData;
    } catch (error) {
      console.log(error);
    }
  };

  initPuppeter = async (url) => {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });

      this.page = await this.browser.newPage();
      await this.page.goto(url, { waitUntil: "domcontentloaded" });
    } catch (err) {
      //await this.finishScrapping();
      console.log("Scrapper Error", err);
      throw err;
    }
  };

  startEvaulate = async (callback) => {
    try {
      if (!this.page) throw new Error("You should initialize scrapper");
      return await this.page.evaluate(callback);
    } catch (error) {
      console.log("Scarpper evaulation error", error);
      //   await this.finishScrapping();
      //   process.exit(1);
    }
  };

  finishScrapping = async () => {
    await this.page.close();
    await this.browser.close();
    console.log("The scrapping window is closed");
  };

  formatDoctor = (data, h) => {
    return data.map((doc) => {
      if (!doc) return;
      doc.speciality = doc.speciality
        ? levensteinDistributor(doc.speciality)
        : "Acil Tıp";

      const titleIds = getTitleIds(doc.titles);
      return new Doctor(
        doc.titles,
        doc.name || null,
        doc.middlename || null,
        doc.surname || null,
        h.number || null,
        h.city || null,
        doc.speciality || null,
        h.mail || nul,
        titleIds,
        doc.imageSrc || null
      );
    });
  };
}

export default Scrap;
