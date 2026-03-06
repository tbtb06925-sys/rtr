const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async(req,res)=>{

const usuarios = await User.find();

res.json(usuarios);

});

router.put("/cambiar-password/:id", async(req,res)=>{

const bcrypt = require("bcryptjs");

const hash = await bcrypt.hash(req.body.password,10);

await User.findByIdAndUpdate(req.params.id,{
password:hash
});

res.json({msg:"Contraseña actualizada"});

});

module.exports = router;
