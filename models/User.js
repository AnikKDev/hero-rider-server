const mongoose = require("mongoose");

const validateURL = (url) => {
  // regular expression to validate URL
  const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  return urlRegex.test(url);
};
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
      required: true,
      validate: [
        validateURL,
        "Please provide a valid URL for the driving licence picture.",
      ],
    },
    area: {
      type: String,
      required: true,
    },
    nidPicture: {
      type: String,
      required: true,
      validate: [
        validateURL,
        "Please provide a valid URL for the NID picture.",
      ],
    },
    profilePicture: {
      type: String,
      required: true,
      validate: [
        validateURL,
        "Please provide a valid URL for the profile picture.",
      ],
    },
    carInformation: {
      name: {
        type: String,
        required: function () {
          return (
            (this.vehicleType === "car" || this.vehicleType === "bike") &&
            this.userRole === "rider"
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
            this.userRole === "rider"
          );
        },
      },
      plateNumber: {
        type: String,
        required: function () {
          return (
            (this.vehicleType === "car" || this.vehicleType === "bike") &&
            this.userRole === "rider"
          );
        },
      },
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 8 characters long"],
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

const User = mongoose.model("User", userSchema);

module.exports = User;
