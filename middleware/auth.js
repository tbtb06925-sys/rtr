const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

const token = req.headers["authorization"];

if(!token){
return res.status(401).json({msg:"Token requerido"});
}

try{

const decoded = jwt.verify(token,"secreto");

req.usuario = decoded;

next();

}catch(error){

res.status(401).json({msg:"Token inválido"});

}

};
