const btn_add = document.querySelector(".submit_add");

function addAccount() {
  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let name_showInput = document.querySelector("#name_show");
  let spamInput = document.querySelectorAll('input[name="spam"');
  let addressInput = document.querySelector("#address");
  let phoneInput = document.querySelector("#phone");
  let rankInput = document.querySelectorAll('input[name="rank"');

  let nameValue = nameInput.value;
  let emailValue = emailInput.value;
  let name_showValue = name_showInput.value;
  let addressValue = addressInput.value;
  let phoneValue = phoneInput.value;

  for (const radioButton of spamInput) {
    if (radioButton.checked) {
      spamValue = radioButton.value;
      break;
    }
  }

  for (const radioButton of rankInput) {
    if (radioButton.checked) {
      rankValue = radioButton.value;
      break;
    }
  }

  const formData = {
    name: nameValue,
    email: emailValue,
    status: 0,
    name_show: name_showValue,
    spam: Number(spamValue),
    address: addressValue,
    phone: phoneValue,
    rank: Number(rankValue),
  };

  account.addAccount(formData).then((data) => {
    return console.log(data);
  });
}

btn_add.addEventListener("click", (e) => {
  addAccount();
});
