const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/registro", async (req,res)=>{

const {nombre,usuario,password} = req.body;

const hash = await bcrypt.hash(password,10);

const nuevo = new User({
nombre,
usuario,
password:hash
});

await nuevo.save();

res.json({msg:"Usuario creado"});

});

router.post("/login", async (req,res)=>{

const {usuario,password} = req.body;

const user = await User.findOne({usuario});

if(!user){
return res.status(400).json({msg:"Usuario no existe"});
}

const valid = await bcrypt.compare(password,user.password);

if(!valid){
return res.status(400).json({msg:"Contraseña incorrecta"});
}

const token = jwt.sign({

id:user._id,
rol:user.rol

},"secreto");

res.json({

token,
usuario:user.nombre,
rol:user.rol,
foto:user.foto

});

});

module.exports = router;
