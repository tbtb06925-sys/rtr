const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   CONEXIÓN A MONGODB
========================= */

mongoose.connect(
"mongodb+srv://USUARIO:CONTRASEÑA@cluster0.mongodb.net/reciclaje?retryWrites=true&w=majority"
)
.then(() => {
    console.log("✅ Conectado a MongoDB");
})
.catch((error) => {
    console.log("❌ Error de conexión:", error);
});

/* =========================
   MODELO USUARIO
========================= */

const UserSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    usuario: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        default: "usuario"
    }

});

const User = mongoose.model("User", UserSchema);

/* =========================
   RUTA PRINCIPAL
========================= */

app.get("/", (req, res) => {

    res.json({
        mensaje: "API funcionando correctamente"
    });

});

/* =========================
   REGISTRO DE USUARIO
========================= */

app.post("/api/auth/register", async (req, res) => {

    try {

        const { nombre, usuario, password } = req.body;

        const existe = await User.findOne({ usuario });

        if (existe) {
            return res.status(400).json({
                mensaje: "El usuario ya existe"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            nombre,
            usuario,
            password: hash
        });

        await nuevoUsuario.save();

        res.json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* =========================
   LOGIN
========================= */

app.post("/api/auth/login", async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const user = await User.findOne({ usuario });

        if (!user) {
            return res.status(400).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const validar = await bcrypt.compare(password, user.password);

        if (!validar) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        res.json({
            mensaje: "Login correcto",
            usuario: user.nombre,
            rol: user.rol
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* =========================
   LISTAR USUARIOS
========================= */

app.get("/api/users", async (req, res) => {

    try {

        const usuarios = await User.find();

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* =========================
   ELIMINAR USUARIO
========================= */

app.delete("/api/users/:id", async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Usuario eliminado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* =========================
   INICIAR SERVIDOR
========================= */

app.listen(PORT, () => {

    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);

});
