function account() {
  BaseAPI.call(this);
  this.getAll = async () => {
    return this.get(`accounts`);
  };

  this.addAccount = async (accountData) => {
    return this.post(`accounts`, accountData);
  };

  this.deleteAccount = (id) => {
    return this.delete(`accounts`, id);
  };

  this.editAccount = function (accountData, id) {
    return this.put(`accounts`, accountData, id);
  };

  this.getAccountById = async (id) => {
    return this.get(`accounts/${id}`);
  };
}
