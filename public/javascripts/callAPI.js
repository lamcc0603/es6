import BaseAPI from "../../baseAPI.js";

function cate() {
  BaseAPI.call(this);
  this.getAll = function () {
    return this.get(`categories`).then((data) => data);
  };

  this.getById = function (id) {
    return this.get(`categories/${id}`).then((data) => data);
  };
}

function product() {
  BaseAPI.call(this);
  this.getAll = function () {
    return this.get(`products`).then((data) => data);
  };

  this.getProductByCateId = function (id) {
    return this.get(`products?cate_id=${id}`).then((data) => data);
  };

  this.getProductById = function (id) {
    return this.get(`products/${id}`).then((data) => data);
  };
}

function account() {
  BaseAPI.call(this);
  this.getAll = function () {
    return this.get(`accounts`).then((data) => data);
  };

  this.editAccount = function (id, AccountData) {
    return this.put(`accounts/${id}`, AccountData);
  };

  this.getAccountById = function (id) {
    return this.get(`accounts/${id}`).then((data) => data);
  };
}

export { cate, product, account };
