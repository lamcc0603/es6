const btn_edit = document.querySelector(".submit_edit");
let params = new URLSearchParams(location.search);
let id = params.get("id");

const form = document.querySelector("#edit_form");

function ShowOrderById(id) {
  order.getOrderById(id).then((data) => {
    form.innerHTML = `
    <div class="form_control">
    <label for="">Account Name</label>
    <input
      type="text"
      name="account_name"
      placeholder="Nhập tên khách hàng"
      id="account_name"
      value="${data.account_name}"
    />
  </div>
  <div class="form_control">
    <label for="">Account Address</label>
    <input
      type="text"
      name="account_address"
      placeholder="Nhập địa chỉ"
      id="account_address"
      value="${data.account_address}"
    />
  </div>
  <div class="form_control">
    <label for="">Account Email </label>
    <input
      type="email"
      name="account_email"
      placeholder="Nhập email"
      id="account_email"
      value="${data.account_email}"
    />
  </div>
  <div class="form_control">
    <label for="">Account Phone </label>
    <input
      type="number"
      name="account_phone"
      placeholder="Nhập số điện thoại"
      id="account_phone"
      value="${data.account_phone}"
    />
  </div>
  
  <div class="form_control radio">
  <label for="">Status</label>
  <input ${
    data.status == 0 ? "checked" : " "
  } type="radio" name="status" id="status-0" value="0" />Xác nhận
  <input ${
    data.status == 1 ? "checked" : " "
  } type="radio" name="status" id="status-1" value="1"  />
  Chuẩn bị hàng
  <input ${
    data.status == 2 ? "checked" : " "
  } type="radio" name="status" id="status-2" value="2"  />
      Đang giao
      <input ${
        data.status == 3 ? "checked" : " "
      } type="radio" name="status" id="status-3" value="3"  />
      Thành công
</div>

  `;
  });
}
ShowOrderById(id);

function handleEditOrder(id) {
  let nameInput = document.querySelector("#account_name");
  let emailInput = document.querySelector("#account_email");
  let addressInput = document.querySelector("#account_address");
  let phoneInput = document.querySelector("#account_phone");
  let statusInput = document.querySelectorAll('input[name="status"');

  let nameValue = nameInput.value;
  let emailValue = emailInput.value;
  let addressValue = addressInput.value;
  let phoneValue = phoneInput.value;
  var today = new Date();
  let dateValue =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  for (const radioButton of statusInput) {
    if (radioButton.checked) {
      statusValue = radioButton.value;
      break;
    }
  }

  const formData = {
    account_name: nameValue,
    account_address: addressValue,
    status: Number(statusValue),
    account_email: emailValue,
    date: dateValue,
    account_phone: phoneValue,
  };

  console.log(formData);

  order.editOrder(id, formData).then((data) => {
    console.log("data:" + data);
  });
}

btn_edit.addEventListener("click", (e) => {
  handleEditOrder(id);
});
