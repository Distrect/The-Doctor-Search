export const formatData = (obj) => {
  return Object.entries(obj).map(([key, val], i) => ({
    title: val[0],
    attr: val[1],
  }));
};

export const reduceTitles = (doctortitles) =>
  doctortitles.map((val) => val.title).join(" ");

// export const reduceTitles = (doctortitles) =>
//   doctortitles.reduce((acc, val) => (!acc ? val.title : " " + val.title), "");

export const getAddress = async (loc) => {
  console.log(window.google.maps);
};

export const modalContainer = (open = true) => {
  const container = document.getElementById("modal-container");
  container.style.zIndex = open ? 2 : -1;
};

export const debouncer = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};

export const getDoctors = async (
  queryObj,
  url = "/filters/getdoctors",
  method = "POST"
) => {
  try {
    const response = await fetch(`http://localhost:2000` + url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(method === "POST" ? { body: JSON.stringify(queryObj) } : {}),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
