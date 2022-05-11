function BaseAPI() {
  axios.defaults.baseURL =
    "https://es6-asm-default-rtdb.asia-southeast1.firebasedatabase.app/";

  this.get = async (endPoint) => {
    return await axios.get(`/${endPoint}.json`);
  };

  this.post = async (endPoint, dataPost) => {
    return await axios.post(`/${endPoint}.json`, dataPost);
  };

  this.delete = async (endPoint, id) => {
    return await axios.delete(`/${endPoint}/${id}.json`);
  };

  this.put = async (endPoint, dataPut, id) => {
    return await axios.put(`/${endPoint}/${id}.json`, dataPut);
  };
}
export default BaseAPI;

import { Config } from "./config.js";

export class BaseAPI2 {
  URL = Config.URL;
  get = async (endPoint) => {
    return await axios.get(`${this.URL}/${endPoint}.json`);
  };

  post = async (endPoint, dataPost) => {
    return await axios.post(`${this.URL}/${endPoint}.json`, dataPost);
  };

  delete = async (endPoint) => {
    return await axios.delete(`${this.URL}/${endPoint}.json`);
  };

  put = async (endPoint, dataPut) => {
    return await axios.put(`${this.URL}/${endPoint}.json`, dataPut);
  };
}
