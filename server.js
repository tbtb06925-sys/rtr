require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registros', require('./routes/registros'));
app.use('/api/usuarios', require('./routes/usuarios'));

// conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB conectado");
})
.catch(err => {
    console.log("❌ Error MongoDB:", err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
