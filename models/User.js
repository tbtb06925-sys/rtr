const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  usuario: {
    type: String,
    unique: true
  },
  password: String,
  rol: {
    type: String,
    default: "usuario"
  },
  foto: String,
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
