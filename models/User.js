const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: [11, "Phone Number must be at least 11 numbers"],
    },
    drivingLicencePicture: {
      type: String,
      required: () => {
        this.role === "rider";
      },
      validate: [
        validator.isURL,
        "Please provide a valid URL for the driving licence picture.",
      ],
    },
    area: {
      type: String,
      required: () => {
        this.role === "rider";
      },
    },
    nidPicture: {
      type: String,
      required: true,
      validate: [
        validator.isURL,
        "Please provide a valid URL for the NID picture.",
      ],
    },
    profilePicture: {
      type: String,
      required: true,
      validate: [
        validator.isURL,
        "Please provide a valid URL for the profile picture.",
      ],
    },
    carInformation: {
      name: {
        type: String,
        required: function () {
          return (
            (this.vehicleType === "car" || this.vehicleType === "bike") &&
            this.role === "rider"
          );
        },
        minlength: [4, "Name can't be less than 4 characters"],
        maxlength: [16, "Name can't be more than 16 characters"],
      },
      model: {
        type: String,
        required: function () {
          return (
            (this.vehicleType === "car" || this.vehicleType === "bike") &&
            this.role === "rider"
          );
        },
      },
      plateNumber: {
        type: String,
        required: function () {
          return (
            (this.vehicleType === "car" || this.vehicleType === "bike") &&
            this.role === "rider"
          );
        },
      },
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} is not strong enough. (minimum length: 6, minimum lowercase: 3, minimum numbers: 1, minimum uppercase: 1, minimum symbols: 1)",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    role: {
      type: String,
      enum: ["rider", "learner"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hashing the password
userSchema.pre("save", function (next) {
  const password = this.password;
  // console.log(password)
  // const hashedPassword = bcrypt.hashSync(password);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  this.password = hashedPassword;
  this.confirmPassword = undefined;

  next();
});
// check both password and salt
userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
