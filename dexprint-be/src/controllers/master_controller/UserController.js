const userModel = require("../../models/user.model");
const api = require("../../tools/common");

const getAllUser = async (req, res) => {
  try {
    let users = await userModel.getAll();
    return api.success(res, users);
  } catch (error) {
    console.log(error);
    return api.error(res, "Internal Server Error", 500);
  }
};
const getUserByID = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await userModel.GetByUserID(id);
    return api.success(res, user);
  } catch (error) {
    console.log(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    let result = await userModel.update(id, data);
    return api.success(res, result);
  } catch (error) {
    console.log(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const deletedUser = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await userModel.remove(id);
    return api.success(res, result);
  } catch (error) {
    console.log(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllUser,
  getUserByID,
  updateUser,
  deletedUser,
};
