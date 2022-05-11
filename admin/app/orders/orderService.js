function order() {
  BaseAPI.call(this);
  this.getAll = async () => {
    return this.get(`orders`);
  };

  this.addOrder = async (OrderData) => {
    return this.post(`orders`, OrderData);
  };

  this.deleteOrder = (id) => {
    return this.delete(`orders`, id);
  };

  this.editOrder = function (OrderData, id) {
    return this.put(`orders`, OrderData, id);
  };

  this.getOrderById = async (id) => {
    return this.get(`orders/${id}`);
  };
}
