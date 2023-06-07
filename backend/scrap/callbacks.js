export const devletScrapperCallback = () => {
  const removeUzm = (duty) => {
    return duty.replace("Uzm.", "").trim();
  };
  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = ["Doç.", "Dr.", "Dyt.", "Dt."];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    info["name"] = data[0];
    if (data.length === 2) info["surname"] = data[1];
    else (info["middlename"] = data[1]), (info["surname"] = data[2]);

    return info;
  };

  const doctors = document.querySelectorAll(".cpDoctor");
  const extractedDoctors = Array.from(doctors).map((val, i) => {
    const image = val.querySelector(".cpDoctorImage");
    const name = val.querySelector(".cpDoctorName").textContent;
    const duty = val.querySelector(".cpDoctorDuty").textContent;
    const inf = extractData(name);
    const speciality = removeUzm(duty);
    console.log(image.src, inf, speciality);
    return { ...inf, speciality, imageSrc: image.src };
  });

  return extractedDoctors;
};

export const yduhCallback = () => {
  const extractDuty = (str) => {
    return str.slice(1, str.length).trim();
  };

  const cap = (str) => {
    const smalled = str.toLocaleLowerCase("tr-TR");

    return (smalled[0].toUpperCase() + smalled.substring(1)).trim();
  };

  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = ["Prof.", "Yrd.", "Doç.", "Uzm.", "Dr.", "Dyt.", "Dt."];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    info["name"] = cap(data[0].trim());
    if (data.length === 2) info["surname"] = cap(data[1].trim());
    else {
      info["middlename"] = cap(data[1].trim());
      info["surname"] = cap(data[2].trim());
    }
    return info;
  };

  const allDoctors = document.querySelectorAll(".card-staff.link-card");
  const doctors = Array.from(allDoctors).map((doc, i) => {
    const image = doc.querySelector(".wp-post-image");
    const fullname = doc.querySelector(".card-staff__title");
    const duty = doc.querySelector(".card-staff__duty div");
    const phone = doc.querySelector('a[href^="tel:"]').title;
    const info = extractData(fullname.textContent.trim());
    const speciality = extractDuty(duty.textContent.trim());
    return { ...info, phone, speciality, imageSrc: image.dataset.src };
  });

  return doctors;
};

export const kolanCallback = () => {
  const converter = (doc) => {
    let replaced = doc
      .querySelector("figcaption h3 a")
      .outerHTML.replace("<br>", " ");
    let div = document.createElement("div");
    div.innerHTML = replaced;
    return div.textContent;
  };

  const cap = (str) => {
    try {
      const smalled = str.toLocaleLowerCase("tr-TR");

      return (
        smalled[0].toUpperCase() + smalled.substring(1).toLowerCase()
      ).trim();
    } catch (error) {
      console.log(error, str);
    }
  };

  const extractDuty = (arr) => {
    return arr.map((str) => {
      str = str.trim();
      const spIndex = str.indexOf("(");
      const epIndex = str.indexOf(")");

      if (spIndex !== -1 && epIndex !== -1) {
        str =
          str.slice(0, spIndex).trim() +
          " " +
          str.slice(epIndex + 1, str.length).trim();
      }

      return str.trim();
    });
  };
  const extractData = (str) => {
    str = str.replace(/\u00A0/g, " ");
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = [
      "Prof.",
      "Yrd.",
      "Doç.",
      "Op.",
      "Uzm.",
      "Dr.",
      "Dyt.",
      "Dt.",
    ];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    if (data[0] === "FigenİNCE") {
      info["name"] = "Figen";
      info["surname"] = "İnce";
      return info;
    } else if (data[0] === "HüseyinKURTDEMİR") {
      info["name"] = "Hüseyin";
      info["surname"] = "Kurtdemir";
      return info;
    }

    info["name"] = cap(data[0]);
    if (data.length === 2) info["surname"] = cap(data[1]);
    else {
      info["middlename"] = cap(data[1]);
      info["surname"] = cap(data[2]);
    }

    return info;
  };

  const allDoctors = document.querySelectorAll(".exp-arrow figure");

  return Array.from(allDoctors).map((doc, i) => {
    const imageSrc = doc.querySelector(".tpstyle-10-image img").src;
    const duty = extractDuty(
      doc.querySelector("figcaption h5").textContent.split(",")
    );
    const name = doc.querySelector("figcaption h3 a").textContent;
    let x = converter(doc);
    console.log("sixer", x);
    const info = extractData(name);
    let phone = doc.querySelector(".tp-ctsocial.teampress-Tel a").href;
    let np = phone.slice(phone.indexOf(":") + 1 + 1 + 1);
    console.log(phone);
    return { ...info, imageSrc, speciality: duty[0], phone: np };
  });
};

export const eliteCallback = () => {
  console.clear();

  const extractDuty = (str) => {
    return str
      .replace("Uzmanı", "")
      .replace("Uzman", "")
      .replace("Laboratuvar Direktörü", "")
      .trim();
  };

  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = [
      "Prof.",
      "Yrd.",
      "Doç.",
      "Op.",
      "Uzm.",
      "Dr.",
      "Dyt.",
      "Dt.",
      "Psk.",
    ];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    info["name"] = data[0];
    if (data.length === 2) info["surname"] = data[1];
    else (info["middlename"] = data[1]), (info["surname"] = data[2]);

    return info;
  };
  const { children } = document.querySelector(
    '[data-id="6ed3af0"] .elementor-widget-wrap'
  );
  const arr = Array.from(children);
  const top = document.querySelector('[data-id="9cf4506"]');
  const bottom = document.querySelector('[data-id="8b3d0b4"]');

  const topIndex = arr.indexOf(top);
  const bottomIndex = arr.indexOf(bottom);
  const sliced = arr.slice(topIndex + 1, bottomIndex);

  const doctors = [];

  sliced.forEach((wrap, i) => {
    const row = wrap.querySelector(".elementor-row");
    const all = row.querySelectorAll(
      ".elementor-column.elementor-col-33.elementor-inner-column.elementor-element"
    );
    let rowRet = Array.from(all).map((val, i) => {
      const imageSrc = val
        .querySelector("img")
        .srcset.split(",")[0]
        .split(" ")[0];
      const name = val.querySelector("h2").textContent;
      const duty = val.querySelector("p").textContent;
      if (duty.includes("Hekim")) return null;
      const info = extractData(name);
      const speciality = extractDuty(duty);
      return { ...info, imageSrc, speciality };
    });

    doctors.push(...rowRet);
  });

  return doctors;
};

export const yasamCallback = () => {
  const getImage = (el) => {
    const url = getComputedStyle(el).backgroundImage;
    return url.substring(url.indexOf('"') + 1, url.lastIndexOf('"'));
  };

  const cap = (str) => {
    if (str === "ve") return str;
    return str[0].toUpperCase() + str.substring(1).toLowerCase().trim();
  };

  const extractSpeciality = (str) => {
    str = str.replace(/[\r\n]+/gm, " ");
    const ret = [];
    str.split(" ").forEach((val) => {
      if (val === "KBB") return ret.push("Kulak Burun Boğaz");
      if (val.includes("(") || val === "Medikal" || val === "Uzman") return;
      return ret.push(cap(val));
    });

    return ret.join(" ").trim();
  };

  const extractData = (str) => {
    const titles = [
      "Prof",
      "Yrd",
      "Doç",
      "Op",
      "Uzm",
      "Dr",
      "Dyt",
      "Dt",
      "Psk",
      "Psi",
    ];

    const data = str
      .split(".")
      .map((s, i, a) =>
        i === a.length - 1
          ? s
              .trim()
              .split(" ")
              .map((c) => cap(c))
          : cap(s)
      )
      .flat();

    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };

    titles.forEach((val, i) => {
      const index = data.indexOf(val);
      if (index === -1) return;
      info.titles.push(val === "Psi" ? "Psk" : val);
      data.splice(index, 1);
    });

    info.name = data[0];
    if (data.length === 2) {
      info.surname = data[1];
    } else {
      info.middlename = data[1];
      info.surname = data[2];
    }
    return info;
  };

  const titles = Array.from(
    document.querySelectorAll(".elementor-flip-box__layer__title")
  );

  const desc = Array.from(
    document.querySelectorAll(".elementor-flip-box__layer__description")
  );

  const images = Array.from(
    document.querySelectorAll(
      ".elementor-flip-box__layer.elementor-flip-box__back"
    )
  );

  const max = Math.max(titles.length, desc.length, images.length);
  const doctors = [];

  for (let i = 0; i <= max - 1; i++) {
    if (i <= 1) continue;
    let name = titles[i].textContent.trim();
    let spec = desc[i].textContent.trim();
    let image = getImage(images[i]);
    let speciality = extractSpeciality(spec.trim());
    const info = extractData(name);
    doctors.push({ ...info, imageSrc: image, speciality });
  }

  return doctors;
};

export const cyprusCentralCallback = () => {
  const cards = document.querySelectorAll(".mkdf-team.info-bellow");

  const extractDuty = (str) => {
    const i = str.indexOf("(");
    str = str.replace(/,/g, "").replace("-", "ve");

    if (i !== -1) {
      const l = str.indexOf(")");
      str = str.substring(i - 1, l);
    }

    console.log(str);
  };

  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = [
      "Prof.",
      "Yrd.",
      "Doç.",
      "Op.",
      "Uzm.",
      "Dr.",
      "Dyt.",
      "Dt.",
      "Psk.",
      "Jin.",
    ];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    info["name"] = data[0];
    if (data.length === 2) info["surname"] = data[1];
    else (info["middlename"] = data[1]), (info["surname"] = data[2]);

    return info;
  };

  return Array.from(cards).map((card) => {
    const image = card.querySelector(".mkdf-team-image img").dataset.src;
    const name = card.querySelector(".mkdf-team-name.entry-title a");
    const spec = card.querySelector(".mkdf-team-position");

    const info = extractData(name.textContent);
    const speciality = extractDuty(spec.textContent);
    console.log(info);

    return { ...info, imageSrc: image, speciality };

    console.log(image, name, spec);
  });
};

export const miracleHospitalCallback = () => {
  const cap = (str) => {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  };

  const extractDuty = (str) => {
    str = str.replace(/Uzmanı|Bölümü/g, "");
    let index = str.indexOf("–");
    str = (index !== -1 ? str.substring(0, index) : str).trim();
    return str;
  };

  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = [
      "Prof.",
      "Yrd.",
      "Doç.",
      "Op.",
      "Uzm.",
      "Uzm",
      "Dr.",
      "Dyt.",
      "Dt.",
      "Psk.",
      "Jin.",
    ];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title !== "Uzm" ? title.slice(0, -1) : title);
    });

    info["name"] = cap(data[0]);
    if (data.length === 2) info["surname"] = cap(data[1]);
    else (info["middlename"] = cap(data[1])), (info["surname"] = cap(data[2]));

    return info;
  };

  const names = Array.from(
    document.querySelectorAll(
      '.h-heading__outer[class*="style-"][class*="style-local-"]'
    )
  );
  const images = Array.from(
    document.querySelectorAll(".h-image__frame-container img")
  );
  const titles = Array.from(
    document.querySelectorAll('[class^="h-text h-text-component"]')
  );

  let other = [];
  names.shift();
  other.push(...titles.splice(14, 1));
  other.push(...titles.splice(15, 1));
  names.push(...other);

  const max = Math.max(names.length, titles.length, images.length);

  const doctors = [];

  for (let i = 0; i < max; i++) {
    let info = extractData(names[i].textContent.trim());
    let imageSrc = images[i].src;
    let speciality = extractDuty(titles[i].textContent.trim());
    doctors.push({ ...info, imageSrc, speciality });
  }

  return doctors;
};

export const medicalPortCallback = () => {
  const extractDuty = (str) => {
    return str.replace(/Uzmanı/g, "").trim();
  };

  const extractData = (str) => {
    const info = {
      titles: [],
      name: "",
      middlename: "",
      surname: "",
    };
    const titles = [
      "Prof.",
      "Yrd.",
      "Doç.",
      "Op.",
      "Uzm.",
      "Dr.",
      "Dyt.",
      "Dt.",
      "Psk.",
      "Jin.",
    ];
    const data = str.split(" ");

    titles.forEach((title) => {
      const index = data.indexOf(title);
      if (index === -1) return;
      data.splice(index, 1);
      info.titles.push(title.slice(0, -1));
    });

    info["name"] = data[0];
    if (data.length === 2) info["surname"] = data[1];
    else (info["middlename"] = data[1]), (info["surname"] = data[2]);

    return info;
  };

  const doctors = document.querySelectorAll(".team.team_vertical");
  console.log(doctors);

  return Array.from(doctors).map((doc, i) => {
    const name = doc.querySelector(".title").textContent;
    const spec = doc.querySelector(".desc_wrapper h4").textContent;
    const imageSrc = doc.querySelector("img").src;
    const info = extractData(name);
    const speciality = extractDuty(spec.trim());
    console.log(spec);

    return { ...info, imageSrc, speciality };
  });
};
