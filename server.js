
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const reciclajeRoutes = require("./routes/reciclaje");

const app = express();

app.use(cors());
app.use(express.json({limit:"20mb"}));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/reciclaje", reciclajeRoutes);

app.get("/", (req,res)=>{
    res.send("API funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en puerto", PORT);
});
