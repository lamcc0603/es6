import * as Service from "./callAPI.js";
// import * as CountBtn from "./count_btn.js";

const cateServices = new Service.cate();
const productService = new Service.product();
const accountService = new Service.account();

let arrCart = JSON.parse(localStorage.getItem("arrCart"));

function showCategories() {
  let body = `
  <li class="menu-item">
  <a href="home.html?page=home" class="menu-link">Trang chủ</a>
  </li>`;
  cateServices.getAll().then((data) => {
    for (const [key, cate] of Object.entries(data.data)) {
      if (data.data[key] != null && cate.hot == 1) {
        //     hiện ra UI
        let htmls = `
        <li class="menu-item">
        <a href="categories.html?page=categories&id=${key}" class="menu-link">
          ${cate.name}
        </a>
        </li>
              `;
        body += htmls;
      }
    }
    body += ` <li class="menu-item">
      <a href="categories.html?page=allproduct" class="menu-link">Xem tất cả</a>
      </li>`;
    document.querySelector("ul").innerHTML = body;
  });
}

function showProductsNoiBat(range = 8) {
  productService.getAll().then((data) => {
    let listProductNoiBat = [];
    for (const [key, product] of Object.entries(data.data)) {
      if (data.data[key] != null && product.noiBat == 1) {
        product.key = key;
        listProductNoiBat.push(product);
      }
    }

    const productListDiv = document.querySelector("#product_list--noibat");
    let body = "";
    let listProductNoiBatLimit8 = listProductNoiBat.slice(0, range);

    listProductNoiBatLimit8.forEach((data) => {
      let str = `
      <div class="product_item">
                 <span class="product_price--discount">
                 ${data.giamgia == 0 ? "" : -data.giamgia + "%"}
                 </span>
                 <div class="product_img">
                   <a href="product.html?page=product&id=${data.key}"
                   ><img src="../../public/${data.image}" alt="${data.name}" />
                   </a>
                 </div><div class="product_name">
                     <a href="#">
                       <p>${data.name}</p>
                     </a>
                   </div><div class="product_price">
                     <span class="text-red">
                       ${(
                         data.price -
                         parseFloat(
                           (Number(data.price) * Number(data.giamgia)) / 100
                         )
                       ).toLocaleString("vi-VN")}đ</span>
                       <span class="text-gray">
                       ${
                         data.giamgia == 0
                           ? ""
                           : data.price.toLocaleString("vi-VN")
                       }
                     </span>
                   </div></>
        </div>
      `;
      body += str;
    });
    if (productListDiv) productListDiv.innerHTML = body;
  });
}

function showProduct() {
  productService.getAll().then((data) => {
    let body = "";
    for (const [key, product] of Object.entries(data.data)) {
      if (data.data[key] != null) {
        let str = `
        <div class="product_item">
          <span class="product_price--discount"
            > ${product.giamgia == 0 ? "" : -product.giamgia + "%"}</span
          >
          <div class="product_img">
            <a href="product.html?page=product&id=${key}"
              ><img src="../../public/${product.image}" alt="${product.name}"
            /></a>
          </div>
          <div class="product_name">
            <a href="#"><p>${product.name}</p></a>
          </div>
          <div class="product_price">
            <span class="text-red">
            ${
              product.giamgia !== 0
                ? (
                    product.price -
                    parseFloat(
                      (Number(product.price) * Number(product.giamgia)) / 100
                    )
                  ).toLocaleString("vi-VN") + "đ"
                : product.price.toLocaleString("vi-VN") + "đ"
            }
                  </span
            ><span class="text-gray"
              >${
                Number(product.giamgia) === 0
                  ? ""
                  : Number(product.price).toLocaleString("vi-VN") + "đ"
              }
              </span
            >
          </div>
        </div>`;
        body += str;
        let productList = document.querySelector(".product_list");
        if (productList) productList.innerHTML = body;
      }
    }
  });
}

function showProductByCateId(id, range = 1000) {
  productService.getAll().then((data) => {
    let body = "";
    let listProductByCategory = [];
    for (const [key, product] of Object.entries(data.data)) {
      if (data.data[key] != null && product.cate_id == id) {
        product.key = key;
        listProductByCategory.push(product);
      }
    }
    listProductByCategory = listProductByCategory.slice(0, range);
    listProductByCategory.forEach((sp) => {
      let str = `
  <div class="product_item">
    <span class="product_price--discount"
      > ${sp.giamgia == 0 ? "" : -sp.giamgia + "%"}</span
    >
    <div class="product_img">
      <a href="product.html?page=product&id=${sp.key}"
        ><img src="../../public/${sp.image}" alt="${sp.name}"
      /></a>
    </div>
    <div class="product_name">
      <a href="#"><p>${sp.name}</p></a>
    </div>
    <div class="product_price">
      <span class="text-red">
      ${
        sp.giamgia !== 0
          ? (
              sp.price -
              parseFloat((Number(sp.price) * Number(sp.giamgia)) / 100)
            ).toLocaleString("vi-VN") + "đ"
          : sp.price.toLocaleString("vi-VN") + "đ"
      }
            </span
      ><span class="text-gray"
        >${
          Number(sp.giamgia) === 0
            ? ""
            : Number(sp.price).toLocaleString("vi-VN") + "đ"
        }
        </span
      >
    </div>
  </div>
          `;
      body += str;
    });
    let productList = document.querySelector(".product_list");
    if (productList) productList.innerHTML = body;
  });
}

function renderHeader() {
  const headDiv = document.querySelector(".head");
  let str = `
  <div class="freeship_banner">
  <p>Miễn phí vận chuyển với tất cả đơn hàng</p>
</div>
<header class="header">
  <div class="container">
    <div class="header_logo">
      <a href="home.html?page=home" class="header_logo--link">
        <img src="../../public/images/logo_nike.png" alt="" />
      </a>
    </div>

    <nav class="header_bar">
      <ul class="menu"></ul>
    </nav>

    <div class="header_panel">
      <div class="panel_account panel" id="panel_account">
        <a id="goLogin"><i class="fas fa-user"></i></a>

      </div>
      <div class="panel_find panel">
        <a id="search_btn"><i class="fas fa-search"></i></a>
        <div id="search_box">
        <input type="text" id="search_keyword" placeholder="Nhập từ khóa">
        <input type="submit"  id="search_submit" value="Tìm" />
        </div>
      </div>
      <div class="panel_cart panel">
        <a><i class="fas fa-shopping-cart"></i></a>
        <table id="shopping-cart"> 
        <thead>
          <tr>
            <td class="cart-image">Hình ảnh</td>
            <td class="cart-name">Tên</td>
            <td class="cart-count">Số lượng</td>
            <td class="cart-price">Giá</td>
            <td class="cart-button"></td>
          </tr>
        </thead>
        <tbody>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</header>
  `;
  headDiv.innerHTML = str;
}

function renderHead() {
  const head = document.querySelector("head");
  let str = `
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Categories</title>
  <link rel="stylesheet" href="../../public/scss/style.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  `;
  head.innerHTML = str;
}

function renderBanner() {
  const bannerDiv = document.querySelector(".home_banner");
  let str = `
  <img src="../../public/images/banner4.jpg" alt="" />`;
  if (bannerDiv) bannerDiv.innerHTML = str;
}

function renderFooter() {
  const footer = document.querySelector("footer");
  let str = `
  <div class="container">
  <div class="footer_content">
    <div class="footer">
      <div class="footer_introduction">
        <h4 class="footer_title">giới thiệu</h4>
        <p>
          Nike Chuyên cung cấp các loại sản phẩm Giày, Dép, Hàng chính
          hãng giá rẻ, Real 100%
          <br />
          382/7 Nguyễn Thị Minh Khai, Phường 5, Quận 3, Hồ Chí Minh.
          <br />
          Chuyên Order và Hàng có Sẵn.
          <br />
          0327443238. ♦️ 100% Chính Hãng.
          <br />
          THANK YOU FOR SHOPPING WITH US !!
        </p>
      </div>
      <div class="footer_question">
        <h4 class="footer_title">pháp lý & câu hỏi</h4>
        <ul>
          <li><a> - tìm kiếm </a></li>
          <li><a> - giới thiệu </a></li>
          <li><a> - chính sách mua hàng </a></li>
          <li><a> - Chính sách thanh toán </a></li>
          <li><a> - Chính sách giao hàng </a></li>
          <li><a> - Chính sách đổi trả </a></li>
          <li><a> - Chính sách bảo mật </a></li>
          <li><a> - Điều khoản dịch vụ </a></li>
        </ul>
      </div>
      <div class="footer_contact">
        <h4 class="footer_title">pháp lý & câu hỏi</h4>
        <ul>
          <li>
            - Địa chỉ: 382/7 Nguyễn Thị Minh Khai, Phường 5, Quận 3, Hồ
            Chí Minh.
          </li>
          <li>- Điện thoại: 0327443238</li>
          <li>- Mail: nike.shop@gmail.com</li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `;
  footer.innerHTML = str;
}

function showProductById(id) {
  const productDiv = document.querySelector(".product");
  const productListDiv = document.querySelector(".product_list");
  productService
    .getProductById(id)
    .then((data) => {
      let str = `
    <div class="product_img br24">
    <img src="../../public/${data.data.image}" alt="${data.data.name}" />
  </div>

  <div class="product_info">
    <div class="product_info--title">
      <h1>${data.data.name}</h1>
      <div class="product_info--categories"></div>
    </div>

    <div class="product_info--price">
      <div class="discount_price">
        <span> ${data.data.giamgia == 0 ? "" : -data.data.giamgia + "%"} </span>
      </div>
      <div class="product_price main_price">
        <span class="">
        ${
          data.data.giamgia !== 0
            ? (
                data.data.price -
                parseFloat(
                  (Number(data.data.price) * Number(data.data.giamgia)) / 100
                )
              ).toLocaleString("vi-VN") + "đ"
            : data.data.price.toLocaleString("vi-VN") + "đ"
        }</span>
        <span class="text-gray">
        ${
          Number(data.data.giamgia) === 0
            ? ""
            : Number(data.data.price).toLocaleString("vi-VN") + "đ"
        }
          </span
        >

      </div>
    </div>

    <div class="product_info--detail">
      <p>${data.data.detail}</p>
    </div>

    <div class="product_info--count">
      <span class="minus" id="product_minus">-</span>
      <input type="number" value="1" class="count" id="product_count" />
      <span class="plus" id="product_plus">+</span>
    </div>

    <div class="product_info--btn">
      <button id="addProduct_btn" data-id="${
        data.data.id
      }">Thêm vào giỏ</button>
      <button>Mua ngay</button>
    </div>
  </div>`;
      if (productDiv) productDiv.innerHTML = str;
      let cateId = data.data.cate_id;

      return [cateId, data.data];
    })
    .then((data) => {
      let str2 = showProductByCateId(data[0], 4);
      let objLocation = {
        countLocation: document.querySelector("#product_count"),
        minusLocation: document.querySelector("#product_minus"),
        plusLocation: document.querySelector("#product_plus"),
      };
      countBtn(objLocation);
      if (productListDiv) productListDiv.innerHTML = str2;
      return data[1];
    })
    .then((data) => {
      const addCart = document.querySelector("#addProduct_btn");
      const productCount = document.querySelector("#product_count");
      let arrCart = [];
      addCart.addEventListener("click", () => {
        let check = arrCart.map((item) => item.id).indexOf(data.id);
        console.log(check);
        if ((check = -1)) {
          data.count = Number(productCount.value);
          arrCart.push(data);
          localStorage.setItem("arrCart", JSON.stringify(arrCart));
        } else {
          // arrCart[check].count += Number(productCount.value);
          // console.log(arrCart[check]);
          // localStorage.setItem("arrCart", JSON.stringify(arrCart));
        }
      });
    });
}

function checkPage() {
  let url_string = window.location.href;
  const url = new URL(url_string);
  const page = url.searchParams.get("page");
  switch (page) {
    case "product":
      const id = url.searchParams.get("id");
      showProductById(id);
      break;
    case "search":
      showProductByKw();
      break;
    case "allproduct":
      showProduct();
      break;
    case "categories":
      const cate_id = url.searchParams.get("id");
      showProductByCateId(cate_id);
      break;
    default:
      break;
  }
}

function checkLogin() {
  let emailInput = document.querySelector("input[name='email']");
  let pwInput = document.querySelector("input[name='password']");
  let eValue = emailInput.value;
  let pwValue = pwInput.value;

  let isLogin = false;

  accountService.getAll().then((data) => {
    for (const [key, account] of Object.entries(data.data)) {
      if (data.data[key] != null && account.email == eValue) {
        if (account.password == pwValue) {
          isLogin = true;
          sessionStorage.setItem("userName", account.name_show);
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("isAdmin", account.rank);
          //   if (account.rank == 1) {
          //     isLogin = true;
          //     window.location = "/views/layout/login.html";
          //   }
          // } else {
          //   isLogin = false;
          // }
        }
      }
    }
    if (isLogin) {
      window.location = "/views/layout/home.html?page=home";
    } else {
    }
  });
}

function showProductByDate(range = 8) {
  productService.getAll().then((data) => {
    const productListDiv = document.querySelector("#product_list--moinhat");
    let body = "";
    let listProduct = [];

    for (const [key, product] of Object.entries(data.data)) {
      product.key = key;

      listProduct.push(product);
    }

    listProduct.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    listProduct = listProduct.slice(0, range);

    listProduct.forEach((product) => {
      let str = `
      <div class="product_item">
                 <span class="product_price--discount">
                 ${product.giamgia == 0 ? "" : -product.giamgia + "%"}
                 </span>
                 <div class="product_img">
                   <a href="product.html?page=product&id=${product.key}"
                   ><img src="../../public/${product.image}" alt="${
        product.name
      }" />
                   </a>
                 </div><div class="product_name">
                     <a href="#">
                       <p>${product.name}</p>
                     </a>
                   </div><div class="product_price">
                     <span class="text-red">
                       ${(
                         product.price -
                         parseFloat(
                           (Number(product.price) * Number(product.giamgia)) /
                             100
                         )
                       ).toLocaleString("vi-VN")}đ</span>
                       <span class="text-gray">
                       ${
                         product.giamgia == 0
                           ? ""
                           : product.price.toLocaleString("vi-VN")
                       }
                     </span>
                   </div></>
        </div>
      `;
      body += str;
    });
    if (productListDiv) productListDiv.innerHTML = body;
  });
}

function showProductByView(range = 8) {
  const productListDiv = document.querySelector("#product_list--luotxem");
  let body = "";
  let listProduct = [];
  productService.getAll().then((data) => {
    for (const [key, product] of Object.entries(data.data)) {
      product.key = key;

      listProduct.push(product);
    }

    listProduct.sort((a, b) => {
      return b.luotXem - a.luotXem;
    });

    listProduct = listProduct.slice(0, range);
    listProduct.forEach((product) => {
      let str = `
        <div class="product_item">
                   <span class="product_price--discount">
                   ${product.giamgia == 0 ? "" : -product.giamgia + "%"}
                   </span>
                   <div class="product_img">
                     <a href="product.html?page=product&id=${product.key}"
                     ><img src="../../public/${product.image}" alt="${
        product.name
      }" />
                     </a>
                   </div><div class="product_name">
                       <a href="#">
                         <p>${product.name}</p>
                       </a>
                     </div><div class="product_price">
                       <span class="text-red">
                         ${(
                           product.price -
                           parseFloat(
                             (Number(product.price) * Number(product.giamgia)) /
                               100
                           )
                         ).toLocaleString("vi-VN")}đ</span>
                         <span class="text-gray">
                         ${
                           product.giamgia == 0
                             ? ""
                             : product.price.toLocaleString("vi-VN")
                         }
                       </span>
                     </div></>
          </div>
        `;
      body += str;
    });
    if (productListDiv) productListDiv.innerHTML = body;
  });
}

function showProductByKw() {
  let productListDiv = document.querySelector(".product_list");
  let url_string = window.location.href;
  const url = new URL(url_string);
  const kw = url.searchParams.get("kw");
  let body = "";
  let listProductByKeyWord = [];

  productService
    .getAll()
    .then((data) => {
      for (const [key, product] of Object.entries(data.data)) {
        if (data.data[key] != null && product.name.search(kw) != -1) {
          product.key = key;
          listProductByKeyWord.push(product);
        }
      }
      listProductByKeyWord.forEach((sp) => {
        let str = `
  <div class="product_item">
<span class="product_price--discount"
  > ${sp.giamgia == 0 ? "" : -sp.giamgia + "%"}</span
>
<div class="product_img">
  <a href="product.html?page=product&id=${sp.key}"
    ><img src="../../public/${sp.image}" alt="${sp.name}"
  /></a>
</div>
<div class="product_name">
  <a href="#"><p>${sp.name}</p></a>
</div>
<div class="product_price">
  <span class="text-red">
  ${
    sp.giamgia !== 0
      ? (
          sp.price - parseFloat((Number(sp.price) * Number(sp.giamgia)) / 100)
        ).toLocaleString("vi-VN") + "đ"
      : sp.price.toLocaleString("vi-VN") + "đ"
  }
        </span
  ><span class="text-gray"
    >${
      Number(sp.giamgia) === 0
        ? ""
        : Number(sp.price).toLocaleString("vi-VN") + "đ"
    }
    </span
  >
</div>
        </div>`;
        body += str;
      });
      if (productListDiv) productListDiv.innerHTML = body;
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchKw() {
  let search_btn = $("#search_btn");
  let search_input = $("#search_keyword");
  let search_box = $("#search_box");
  search_btn.click(function () {
    search_box.toggle();
  });
  let search_submit = $("#search_submit");
  search_submit.click(function () {
    let kw = search_input.val();
    window.location.href = `/views/layout/categories.html?page=search&kw=${kw}`;
  });
}

function countBtn(obj) {
  let minus = obj.minusLocation;
  let plus = obj.plusLocation;
  let count = obj.countLocation;

  let countValue = Number(count.value);

  minus.addEventListener("click", () => {
    if (countValue > 1) {
      countValue--;
      count.setAttribute("value", countValue);
    }
  });

  plus.addEventListener("click", () => {
    countValue++;
    count.setAttribute("value", countValue);
  });
}

function accountCheckBox() {
  let account_btn = $("#panel_account");
  let account_box = $("#account_box");

  account_btn.click(function () {
    account_box.toggle();
  });
}

function cartBox() {
  let cart_btn = $(".panel_cart");
  let cart_box = $("#shopping-cart");

  cart_btn.click(function () {
    cart_box.toggle();
  });
  cart_box.click(function (e) {
    e.stopPropagation();
  });
}

function showCart(arrCart) {
  let cartDiv = document.querySelector("#shopping-cart tbody");
  let body = "";
  arrCart.forEach((data) => {
    let str = `
    <tr>
        <td class="cart-image" ><image src="../../public${data.image}"></td>
        <td class="cart-name"><p>${data.name}</p></td>
        <td class="cart-count"> 
          <div class="product_info--count">
            <input type="number" value="${data.count}" class="count"  />
          </div>
        </td>
        <td class="cart-price">
        <p>
        ${
          data.giamgia !== 0
            ? (
                data.price -
                parseFloat((Number(data.price) * Number(data.giamgia)) / 100)
              ).toLocaleString("vi-VN") + "đ"
            : data.price.toLocaleString("vi-VN") + "đ"
        }</p>
        
        </td>
        <td class="cart-button product_info--btn">
        <button>Xóa</button>
        </td>
    </tr>`;
    body += str;
  });
  cartDiv.innerHTML = body;
}

// function addProductToCart() {}

renderHead();
renderHeader();
renderBanner();
showCategories();
showProductsNoiBat();
showProductByView();
showProductByDate();
checkPage();
searchKw();
checkLoginBox();
cartBox();
showCart(arrCart);
renderFooter();

function checkLoginBox() {
  let isLogin = false;

  let goLogin = document.querySelector("#goLogin");
  isLogin = sessionStorage.getItem("isLogin");

  if (!isLogin) {
    const btn_login = document.querySelector(".btn_login");

    goLogin.setAttribute("href", "./login.html");
    if (btn_login) {
      btn_login.addEventListener("click", () => {
        checkLogin();
      });
    }
  } else {
    goLogin.removeAttribute("href");
    let userName = sessionStorage.getItem("userName");
    let panelAccount = document.querySelector("#panel_account");
    let body = `
  <a id="goLogin"><i class="fas fa-user"></i></a>
  <ul id="account_box">
  <li><p>Xin chào <b>${userName}</b></p></li>
  <li><p>Thông tin chi tiết</p></li>
  <li id="logout_btn"><p>LogOut</p></li>

</ul>
  `;
    panelAccount.innerHTML = body;

    accountCheckBox();
  }
  const logoutBtn = document.querySelector("#logout_btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("isLogin");
      window.location.href = `/views/layout/home.html?page=home`;
    });
  }
}
