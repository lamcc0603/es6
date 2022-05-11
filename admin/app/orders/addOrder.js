const btn_add = document.querySelector(".submit_add");

function addOrder() {
  let nameInput = document.querySelector("#account_name");
  let emailInput = document.querySelector("#account_email");
  let addressInput = document.querySelector("#account_address");
  let phoneInput = document.querySelector("#account_phone");

  let nameValue = nameInput.value;
  let emailValue = emailInput.value;
  let addressValue = addressInput.value;
  let phoneValue = phoneInput.value;
  var today = new Date();
  let dateValue =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const formData = {
    account_name: nameValue,
    account_address: addressValue,
    status: 0,
    account_email: emailValue,
    account_phone: phoneValue,
    date: dateValue,
  };

  console.log(formData);

  order.addOrder(formData).then((data) => {
    return console.log(data);
  });
}

btn_add.addEventListener("click", (e) => {
  addOrder();
});
