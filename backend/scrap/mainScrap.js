import puppeteer from "puppeteer";

class MainScrap {
  browser;
  page;
  URL;
  callback;

  initPuppeter = async () => {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });

      this.page = await this.browser.newPage();
    } catch (err) {
      console.log("Scrapper Error", err);
      return;
    }
  };

  startEvaulate = async () => {
    try {
      if (!this.page) throw new Error("You should initialize scrapper");
      return await this.page.evaluate(this.callback);
    } catch (error) {
      console.log("Scarpper evaulation error", error);
      process.exit(1);
    }
  };

  finishScrapping = async () => {
    await this.page.close();
    await this.browser.close();
    console.log("The scrapping window is closed");
  };

  changeUrl = async (url, callback) => {
    try {
      if (!url)
        throw new Error("The URL attribute is empty.Please specifiy a URL");

      if (typeof callback !== "function" || !callback)
        throw new Error(
          "The callback cannot be anything other than function. Please insert function"
        );

      const check = new URL(url); 

      this.URL = url;
      this.callback = callback;
      await this.page.goto(this.URL, { waitUntil: "domcontentloaded" });
    } catch (error) {
      console.log("Page Change Error");
    }
  };
}

export default MainScrap;

/*

class MainScrap {
  browser;
  page;
  URL;
  callback;

  constructor(url, callback) {
    if (!url)
      throw new Error("The URL attribute is empty.Please specifiy a URL");

    if (typeof callback !== "function" || !callback)
      throw new Error(
        "The callback cannot be anything other than function. Please insert function"
      );

    this.URL = url;
    this.callback = callback;
  }

  initPuppeter = async () => {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });

      this.page = await this.browser.newPage();
      await this.page.goto(this.URL, { waitUntil: "domcontentloaded" });
    } catch (err) {
      console.log("Scrapper Error", err);
      return;
    }
  };

  startEvaulate = async () => {
    if (!this.page) throw new Error("You should initialize scrapper");
    return this.page.evaluate(this.callback);
  };

  finishScrapping = async () => {
    await this.page.close();
    await this.browser.close();
    console.log("The scrapping window is closed");
  };

  changeUrl= async () => {}


}
*/
