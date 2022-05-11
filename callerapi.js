import { BaseAPI2 } from "./baseAPI.js";

export class FireBaseService extends BaseAPI2 {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  getAll(endPoint) {
    return this.get(endPoint);
  }
  getById(endPoint) {
    return this.get(endPoint);
  }
  addItem(endPoint, data) {
    return this.post(endPoint, data);
  }
}
