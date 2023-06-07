import NodeCache from "node-cache";
import { compressJSON, decompressJSON } from "./util.js";

class Caching {
  Cacher;

  constructor() {
    this.Cacher = new NodeCache({ checkperiod: 0 });
  }

  get = async (key, storeFunc) => {
    try {
      const results = this.Cacher.get(key);
      if (results) {
        return Promise.resolve(decompressJSON(results));
      }

      const newResults = await storeFunc();

      this.set(key, newResults);
      return Promise.resolve(newResults);
    } catch (error) {
      console.log("Cache Error", error);
    }
  };

  set = (key, value) => {
    const compress = compressJSON(value);
    this.Cacher.set(key, compress);
  };
}

const Cache = new Caching();

export default Cache;
