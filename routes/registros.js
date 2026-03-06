const express = require("express");
const router = express.Router();

const Registro = require("../models/Registro");

router.post("/", async(req,res)=>{

const nuevo = new Registro(req.body);

await nuevo.save();

res.json({msg:"Registro guardado"});

});

router.get("/", async(req,res)=>{

const registros = await Registro.find().populate("usuarioId");

res.json(registros);

});

module.exports = router;
