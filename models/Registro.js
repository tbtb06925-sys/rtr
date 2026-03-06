const mongoose = require("mongoose");

const registroSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tipoResiduo: String,
  cantidad: Number,
  semana: Number,
  mes: Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Registro", registroSchema);
