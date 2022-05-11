import BaseAPI from "../../../baseAPI.js";

export default function cate() {
  BaseAPI.call(this);
  this.getAll = async () => {
    return this.get(`categories`);
  };

  this.addCategory = async (categoryData) => {
    console.log(categoryData);
    return this.post(`categories`, categoryData);
  };

  this.deleteCategory = (id) => {
    return this.delete(`categories`, id);
  };

  this.editCategory = (categoryData, id) => {
    return this.put(`categories`, categoryData, id);
  };

  this.getById = async (id) => {
    return this.get(`categories/${id}`);
  };
}

var cateService = new cate();

function addNewCate(newCate) {
  cateService
    .addCategory(newCate)
    .then((newCate) => {
      console.log("Success:", newCate);
    })
    .then(() => {
      alert("Bạn đã thêm thành công");
      window.location = "categories.html?page=categories";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const btn_add = document.querySelector(".submit_add");
if (btn_add) {
  let cateInput = document.querySelector("#name");
  let data = {};
  let lastID = 1;

  function getIDLastCate() {
    cateService.getAll().then((data) => {
      for (const [key, cate] of Object.entries(data.data)) {
        lastID += 1;
      }
    });
  }
  getIDLastCate();
  btn_add.addEventListener("click", () => {
    data = {
      id: lastID,
      name: cateInput.value,
      hot: 0,
    };
    addNewCate(data);
  });
}

function deleteCate(id) {
  cateService
    .deleteCategory(id)
    .then((newCate) => {
      console.log("Success:", newCate);
      const deleteItem = document.querySelector(".cate_item-" + id);
      if (deleteItem) {
        deleteItem.remove();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showCategories() {
  const showCateDiv = document.querySelector(".show_cate");
  let body = "";
  cateService.getAll().then((data) => {
    for (const [key, cate] of Object.entries(data.data)) {
      if (data.data[key] != null) {
        let str = `
          <tr class="cate_item-${key}" >
          <td class="show_cate--id">${cate.id}</td>
          <td class="show_cate--name">${cate.name}</td>
          <td class="show_btn">
          <button class="btn_edit"><a href="./edit_cate.html?id=${key}">Sửa</a></button>
          <button class="btn_delete" data-x="${key}">Xóa</button>
          </td>
          </tr>
          `;
        body += str;
      }
    }
    if (showCateDiv) document.querySelector(".show_cate").innerHTML = body;

    let btn_delete = document.querySelectorAll(".btn_delete");
    console.log(btn_delete);
    btn_delete.forEach((e) => {
      e.addEventListener("click", (event) => {
        deleteCate(event.target.dataset.x);
      });
    });
  });
}
let btn_edit = document.querySelector(".submit_edit");

function editCate() {
  let data = {};
  let params = new URLSearchParams(location.search);
  let id = params.get("id");
  let key = id;
  function ShowCategoryById() {
    const nameInput = document.querySelector("#name");
    cateService.getById(key).then((data) => {
      console.log(data);
      id = data.data.id;
      nameInput.value = data.data.name;
    });
  }

  function handleEditCate(editCate, key) {
    cateService
      .editCategory(editCate, key)
      .then((editCate) => {
        console.log("Success:", editCate);
      })
      .then(() => {
        alert("Bạn đã sửa thành công");
        window.location = "categories.html?page=categories";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const nameInput = document.querySelector("#name");
  ShowCategoryById();
  if (btn_edit) {
    btn_edit.addEventListener("click", () => {
      console.log(data);
      data = {
        id: id,
        name: nameInput.value,
      };

      handleEditCate(data, key);
    });
  }
}
let url_string = window.location.href;
const url = new URL(url_string);
const page = url.searchParams.get("page");
if (page == "categories") showCategories();
if (btn_edit) editCate();
