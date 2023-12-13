const bcrypt = require("bcrypt");
const model = require("../config/models/index");
const uuid = require("uuid");

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const controller = {};

controller.getAll = async function (req, res) {
  try {
      const products = await model.User.findAll();

      res.json({ success: true, data: products });
  } catch (e) {
      console.error(e);
      res.status(500).json({
          success: false,
          message: "Internal server error",
      });
  }
};


controller.getOne = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await model.User.findByPk(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

controller.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await model.User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: "Invalid username or password",
      });
    }

    const token = uuid.v4();
    user.Token = token;

    res.status(HTTP_STATUS.OK).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });

    await user.save();
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};

controller.register = async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await model.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Create user successful",
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.log(e);
    res.status(HTTP_STATUS.NOT_FOUND).json({
      data: e.message,
    });
  }
};


controller.logout = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await model.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.Token = null;
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

controller.editDataUser = async (req, res) => {
  const { userId } = req.params;
  const { username, FullName, Address, Phone } = req.body;

  try {
    const user = await model.User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.username = username || user.username;
    user.FullName = FullName || user.FullName;
    user.Address = Address || user.Address;
    user.Phone = Phone || user.Phone;

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      id: user.id,
      username: user.username,
      email: user.email,
      FullName: user.FullName,
      Address: user.Address,
      Phone: user.Phone
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

controller.delete = async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
      const user = await model.User.findByPk(userId);
      if (!user) {
          return res
              .status(404)
              .json({ success: false, message: "User not found" });
      }

      // await model.Credential.destroy({ where: { UserId: userId } });
      // await model.Product.destroy({ where: { RenterId: userId } });
      await user.destroy();

      res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: "Internal server error",
      });
  }
};

module.exports = controller;
