module.exports = class UserDto {
  id;
  isActivated;
  email;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
};
