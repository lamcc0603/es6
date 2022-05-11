import BaseAPI from "../../../baseAPI.js";
import cate from "../categories/categoriesService.js";
function product() {
  BaseAPI.call(this);
  this.getAll = async () => {
    return this.get(`products`);
  };

  this.addProduct = async (productData) => {
    return this.post(`products`, productData);
  };

  this.deleteProduct = (id) => {
    return this.delete(`products`, id);
  };

  this.editProduct = function (productData, id) {
    return this.put(`products`, productData, id);
  };

  this.getProductById = async (id) => {
    return this.get(`products/${id}`);
  };
}

// Lấy id + name của cate truyền vào option

let productService = new product();
let cateService = new cate();

function addNewProduct(newProduct) {
  productService
    .addProduct(newProduct)
    .then((newProduct) => {
      console.log("Success:", newProduct);
    })
    .then(() => {
      alert("Bạn đã thêm thành công");
      window.location = "products.html?page=products";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const btn_add = document.querySelector(".submit_add");

let nameInput = document.querySelector("#name");
let priceInput = document.querySelector("#price");
let detailInput = document.querySelector("#detail");
let imageInput = document.querySelector("#image");
let cate_idInput = document.querySelector("#cate_id");

let data = {};
let lastID = 1;

function getIDLastProduct() {
  productService.getAll().then((data) => {
    for (const [key, product] of Object.entries(data.data)) {
      lastID += 1;
    }
  });
}

if (btn_add) {
  btn_add.addEventListener("click", () => {
    data = {
      id: lastID,
      name: nameInput.value,
      price: priceInput.value,
      detail: detailInput.value,
      image: "/images/" + imageInput.files[0].name,
      review: "",
      cate_id: cate_idInput.value,
    };
    console.log(data);

    addNewProduct(data);
  });
}

function showCateSelect() {
  const cateSelect = document.querySelector("#cate_id");
  let body = "";
  cateService.getAll().then((data) => {
    for (let [key, cate] of Object.entries(data.data)) {
      let str = `<option value="${cate.id}">${cate.name}</option>`;
      body += str;
    }
    if (cateSelect) cateSelect.innerHTML = body;
  });
}

function showProducts() {
  let body = "";

  productService.getAll().then((data) => {
    for (let [key, product] of Object.entries(data.data)) {
      if (data.data[key] != null) {
        let htmls = `
      <tr  class="product_item-${key}">
      <td  class="show_cate--id">${product.id}</td>
      <td  class="show_cate--name">${product.name}</td>
      <td  class="show_product--price">${product.price}</td>
      <td  class="show_product--detail">${product.detail}</td>
       <td  class="show_product--image"><img src="../public/${product.image}"></td>
      <td style="vertical-align: middle;text-align:center"; class="show_product--cate_id">${product.cate_id}</td>
      <td style="vertical-align: middle;" class="show_btn">
      <button  class="btn_edit"><a href="./edit_product.html?id=${key}">Sửa</a></button>
      <button class="btn_delete" data-x="${key}" >Xóa</button>
      </td>
      </tr>
      `;
        body += htmls;
      }
    }
    document.querySelector(".show_cate").innerHTML = body;

    let btn_delete = document.querySelectorAll(".btn_delete");
    btn_delete.forEach((e) => {
      e.addEventListener("click", (event) => {
        deleteProduct(event.target.dataset.x);
      });
    });
  });
}

function deleteProduct(id) {
  productService
    .deleteProduct(id)
    .then((newProduct) => {
      console.log("Success:", newProduct);
      const deleteItem = document.querySelector(".product_item-" + id);

      if (deleteItem) {
        deleteItem.remove();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function edit_product() {
  let data = {};
  let params = new URLSearchParams(location.search);
  let id = params.get("id");
  let key = id;
  // Sửa
  const btn_edit = document.querySelector(".submit_edit");
  let nameInput = document.querySelector("#name");
  let priceInput = document.querySelector("#price");
  let detailInput = document.querySelector("#detail");
  let imageInput = document.querySelector("#image");
  let cate_idInput = document.querySelector("#cate_id");
  function showCateSelect() {
    const cateSelect = document.querySelector("#cate_id");
    let body = "";
    cateService.getAll().then((data) => {
      for (let [key, cate] of Object.entries(data.data)) {
        let str = `<option value="${cate.id}">${cate.name}</option>`;
        body += str;
      }
      cateSelect.innerHTML = body;
    });
  }
  function getProduct() {
    productService.getProductById(id).then((data) => {
      id = data.data.id;
      nameInput.value = data.data.name;
      priceInput.value = data.data.price;
      detailInput.value = data.data.detail;
      cate_idInput.value = data.data.cate_id;
    });
  }

  function handleEditProduct(editProduct, key) {
    productService
      .editProduct(editProduct, key)
      .then((editProduct) => {
        console.log("Success:", editProduct);
      })
      .then(() => {
        alert("Bạn đã sửa thành công");
        window.location = "products.html?page=products";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  showCateSelect();
  getProduct();

  btn_edit.addEventListener("click", (e) => {
    const data = {
      id: id,
      name: nameInput.value,
      price: priceInput.value,
      detail: detailInput.value,
      image: "/images/" + imageInput.files[0].name,
      review: "",
      cate_id: cate_idInput.value,
    };

    handleEditProduct(data, key);
  });
}

const btn_edit = document.querySelector(".submit_edit");
if (btn_edit) edit_product();

let url_string = window.location.href;
const url = new URL(url_string);
const page = url.searchParams.get("page");

showCateSelect();
getIDLastProduct();
if (page == "products") showProducts();
