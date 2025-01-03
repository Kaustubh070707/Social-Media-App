const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name must be specified");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email must be a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be a Valid password");
  }
};

const validateEditProfile = (req) => {
  const allowedEditFields = ["firstName", "lastName", "gender", "age"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfile };
