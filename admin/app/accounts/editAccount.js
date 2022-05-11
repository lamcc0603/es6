const btn_edit = document.querySelector(".submit_edit");
let params = new URLSearchParams(location.search);
let id = params.get("id");

const form = document.querySelector("#edit_form");

function ShowAccountById(id) {
  account.getAccountById(id).then((data) => {
    form.innerHTML = `
        <div class="form_control">
                        <label for="">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Nhập tên "
                          id="name"
                          value="${data.name}"
                        />
                      </div>
                      <div class="form_control">
                        <label for="">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Nhập email"
                          id="email"
                          value="${data.email}"
                        />
                      </div>
        
                      <div class="form_control">
                        <label for="">Name show</label>
                        <input
                          type="text"
                          name="name_show"
                          id="name_show"
                          placeholder="Nhập name show"
                          value="${data.name_show}"
                        />
                      </div>
                      <div class="form_control radio">
                        <label for="">Spam</label>
                        <input ${
                          data.spam == 0 ? "checked" : " "
                        } type="radio" name="spam" id="spam-0" value="0" />Ban
                        <input ${
                          data.spam == 1 ? "checked" : " "
                        } type="radio" name="spam" id="spam-1" value="1"  />
                        None
                      </div>
        
                      <div class="form_control">
                        <label for="">Address</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Nhập địa chỉ"
                          value="${data.address}"
                        />
                      </div>
        
                      <div class="form_control">
                        <label for="">Phone</label>
                        <input
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder="Nhập số điện thoại"
                          value="${data.phone}"
                        />
                      </div>
        
                      <div class="form_control radio">
                        <label for="">Rank</label>
                        <input
                          type="radio"
                          name="rank"
                          id="rank-0"
                          value="0"
                          ${data.rank == 0 ? "checked" : " "}
                        />User
                        <input ${
                          data.rank == 1 ? "checked" : " "
                        } type="radio" name="rank" id="rank-1" value="1" />Amin
                      </div>`;
  });
}
ShowAccountById(id);

function handleEditAccount(id) {
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
  console.log(formData);

  account.editAccount(id, formData).then((data) => {
    console.log("data:" + data);
  });
}

btn_edit.addEventListener("click", (e) => {
  handleEditAccount(id);
});
