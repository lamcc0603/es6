function renderHead() {
  const head = document.querySelector("head");

  let str = `
  <meta charset="UTF-8" />
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="./ad-home.css" />
    <!-- Boxicons CDN Link -->
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  `;
  head.innerHTML = str;
}
function renderSlideBar() {
  const slideBar = document.querySelector(".sidebar");

  let str = `
  <div class="logo-details">
  <i class="bx bxl-c-plus-plus"></i>
  <span class="logo_name">Nike</span>
</div>
<ul class="nav-links">
  <li>
    <a href="../index.html" class="active">
      <i class="bx bx-grid-alt"></i>
      <span class="links_name">Trang chủ</span>
    </a>
  </li>
  <li class="log_out">
    <a href="#">
      <i class="bx bx-log-out"></i>
      <span class="links_name">Log out</span>
    </a>
  </li>
</ul>
  `;
  slideBar.innerHTML = str;
}
function renderMenu() {
  const menuDiv = document.querySelector(".nav-links");

  const menu = [
    "products",
    "categories",
    "accounts",
    "orders",
    "order_details",
  ];
  let body = "";

  body = `<li>
  <a href="index.html" class="active">
    <i class="bx bx-grid-alt"></i>
    <span class="links_name">Trang chủ</span>
  </a>
  </li>`;
  menu.forEach((menu) => {
    let str = `
  <li>
    <a href="/admin/${menu}.html?page=${menu}">
      <i class="bx bx-box"></i>
      <span class="links_name">${menu}</span>
    </a>
  </li>
          `;
    body += str;
  });

  body += ` <li class="log_out">
<a href="../../views/layout/home.html">
  <i class="bx bx-log-out"></i>
  <span class="links_name">Log out</span>
</a>
</li>`;
  menuDiv.innerHTML = body;
}
function webDefault() {
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");
  sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  };
}

renderHead();
renderSlideBar();
renderMenu();
webDefault();

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};
