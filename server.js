require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

console.log("✅ Conectado a MongoDB");

})
.catch((error)=>{

console.log("❌ Error de conexión:",error);

});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/registros", require("./routes/registros"));

app.get("/",(req,res)=>{

res.json({
mensaje:"API reciclaje funcionando"
});

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("🚀 Servidor corriendo en puerto",PORT);

});
