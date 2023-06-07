import Scrap from "../scrap/Scrap.js";
import { institiutions as allInstitutions } from "../constants/institutions.js";
import {
  cyprusCentralCallback,
  devletScrapperCallback,
  eliteCallback,
  kolanCallback,
  medicalPortCallback,
  miracleHospitalCallback,
  yasamCallback,
  yduhCallback,
} from "../scrap/callbacks.js";

class Hospital {
  hospitalName;
  city;
  lat;
  lng;
  doctors = [];
  url;
  type;
  institutions;
  constructor(name, city, location, institutions, url, number, mail) {
    this.hospitalName = name;
    this.city = city;
    this.lat = location.lat;
    this.lng = location.lng;
    this.scrapurl = url;
    this.institutions = institutions;
    this.number = number;
    this.mail = mail;
    this.url = new URL(url).origin;
  }
}

class DevletHospital extends Hospital {
  constructor(name, city, location, url, phone, mail, callback) {
    super(
      name,
      city,
      location,
      allInstitutions,
      url,
      phone,
      mail,
      devletScrapperCallback
    );
    this.type = "Devlet";
  }
}

class OzelHastane extends Hospital {
  constructor(name, city, location, url, institutions, phone, mail, callback) {
    super(name, city, location, institutions, url, phone, mail, callback);
    this.type = "Ozel";
  }
}

class Register {
  registerMap = new Map();
  constructor() {}

  registerClass = (hospital, callback) => {
    if (!(hospital instanceof Hospital)) {
      throw new Error("Should be Hospital Class");
    }

    this.registerMap.set(hospital.hospitalName, { h: hospital, c: callback });
  };

  getEverything = async () => {
    const hosps = Array.from(this.registerMap.values());
    const scrapArray = hosps.map(({ h, c }, i) => {
      const scrapper = new Scrap();
      return scrapper.Scrap(h, h.scrapurl, c);
    });
    await Promise.all(scrapArray)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  startScrappingProcess = async () => {
    const allHospitals = Array.from(this.registerMap.values());
    console.log(allHospitals);
    const ScrapMain = new Scrap();
    await ScrapMain.scrapAll(allHospitals);
  };
}

const Registerer = new Register();

const bnoh = new DevletHospital(
  "Dr. Burhan Nalbantoğlu",
  "Lefkoşa",
  {
    lat: 35.15821245832793,
    lng: 33.90725352883509,
  },
  "http://bndh.gov.ct.tr/tr/hekimlerimiz/uzman-hekimler",
  "03922232441",
  "info.bndh@gov.ct.tr"
);

const gmdh = new DevletHospital(
  "Gazimağuse Devlet",
  "Gazimağusa",
  {
    lat: 35.15498467412779,
    lng: 33.90416163986552,
  },
  "http://gmdh.gov.ct.tr/tr/hekimlerimiz",
  "03923648520",
  "info.gmdh@gov.ct.tr"
);

const gach = new DevletHospital(
  "Akçiçek",
  "Girne",
  {
    lat: 35.33796443510093,
    lng: 33.3254888245302,
  },
  "http://gah.gov.ct.tr/tr/hekimlerimiz",
  "03928152266",
  "info.gah@gov.ct.tr"
);

const ctph = new DevletHospital(
  "Cengiz Topel",
  "Lefke",
  {
    lat: 35.15756848366957,
    lng: 32.86820249316979,
  },
  "http://cth.gov.ct.tr/tr/hekimlerimiz",
  "03927236351",
  "info.lcth@gov.ct.tr"
);

const yduh = new OzelHastane(
  "Yakın Doğu",
  "Lefkoşa",
  {
    lat: 35.23974635868101,
    lng: 33.32323560209106,
  },
  "https://neareasthospital.com/doktorlar/",
  allInstitutions,
  "03924440535",
  "info@med.neu.edu.tr",
  yduhCallback
);

const kbh = new OzelHastane(
  "Kolan British",
  "Lefkoşa",
  {
    lat: 35.20989699965179,
    lng: 33.31702015263251,
  },
  "https://kolanbritish.com/doktorlarimiz/",
  [
    "Near East Hayat",
    "Acıbadem",
    "İMECE",
    "EUREKO",
    "Inter Partner",
    "Groupama",
    "Mapfree",
    "Anadolu Sigorta",
    "Halk",
  ],
  "03926808080",
  "info@kolanbritish.com",
  kolanCallback
);

const elite = new OzelHastane(
  "Elite",
  "Lefkoşa",
  {
    lat: 35.20090922035726,
    lng: 33.35887674602117,
  },
  "https://www.elitenicosia.com/hakkimizda/",
  ["Acıbadem", "Groupama", "ace europe", "Ankara Sigorta", "Ergo"],
  "03924443548",
  "info@elitenicosia.com",
  eliteCallback
);

const yh = new OzelHastane(
  "Yaşam",
  "Gazimağusa",
  {
    lat: 35.12705589574777,
    lng: 33.92440115445047,
  },
  "https://magusayasam.com/hekimlerimiz/",
  [
    "Halk",
    "Türkiye İş Bankası",
    "ace europe",
    "Ankara Sigorta",
    "AXA Sigorta",
    "benefit",
    "Ergo",
  ],
  "03924441133",
  "info@magusayasam.com",
  yasamCallback
);

const cch = new OzelHastane(
  "Cyprus Central",
  "Gazimağusa",
  { lat: 35.127662012016664, lng: 33.925394776676846 },
  "https://cypruscentralhospital.com/doktorlarimiz/",
  ["AXA Sigorta", "benefit", "Ergo"],
  "03923665085",
  "info@cypruscentralhospital.com",
  cyprusCentralCallback
);

const mh = new OzelHastane(
  "Miracle",
  "Lefkoşa",
  {
    lat: 35.20161856727359,
    lng: 33.330420292892946,
  },
  "https://miraclehospitalcyprus.com/index.php/doktorlarimiz/",
  [
    "Allianz",
    "İMECE",
    "Groupama",
    "Anadolu Sigorta",
    "ace europe",
    "Demir Hayat",
  ],
  "03924446725",
  "info@miraclehospitalcyprus.com",
  miracleHospitalCallback
);

const mp = new OzelHastane(
  "Medical Port",
  "Girne",
  {
    lat: 35.32964507976204,
    lng: 33.33637294602117,
  },
  "https://www.medicalporttunccevik.com/doktorlarimiz/",
  [
    "Allianz",
    "Acıbadem",
    "EUREKO",
    "Halk",
    "AXA Sigorta",
    "Demir Hayat",
    "Ergo",
  ],
  "03928150800",
  "info@medicalporttunccevik.com",
  medicalPortCallback
);
Registerer.registerClass(bnoh, devletScrapperCallback);
Registerer.registerClass(gmdh, devletScrapperCallback);
Registerer.registerClass(gach, devletScrapperCallback);
Registerer.registerClass(ctph, devletScrapperCallback);
Registerer.registerClass(yduh, yduhCallback);
Registerer.registerClass(kbh, kolanCallback);
Registerer.registerClass(elite, eliteCallback);
Registerer.registerClass(yh, yasamCallback);
Registerer.registerClass(mh, miracleHospitalCallback);
Registerer.registerClass(mp, medicalPortCallback);
// Registerer.registerClass(cch, cyprusCentralCallback);

export default Registerer;

/*

  getEverything = async () => {
    const hosps = Array.from(this.registerMap.values());
    const scrapper = new MainScrap();
    await scrapper.initPuppeter();
    const fullfilledData = [];
    try {
      for (const { h, c } of hosps) {
        await scrapper.changeUrl(h.scrapurl, c);
        const data = await scrapper.startEvaulate();
        data.forEach((doc) => {
          if (!doc) return;
          doc.speciality = doc.speciality
            ? levensteinDistributor(doc.speciality)
            : "Acil Tıp";

          const titleIds = getTitleIds(doc.titles);
          const NDoc = new Doctor(
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
          h.doctors.push(NDoc);
        });
        fullfilledData.push(h);
      }
      await scrapper.finishScrapping();
      // await DoctorModel.bulkDoctor(fullfilledData);
    } catch (error) {
      console.log("An error has occured", error);
    }
  };
*/

/*
 getEverything = async () => {
    const hosps = Array.from(this.registerMap.values());
    const scrapArray = hosps.map(({ h, c }, i) =>
      Scrap.Scrap(h, h.scrapurl, c)
    );
    await Promise.all(scrapArray)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
*/
