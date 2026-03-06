router.post("/registro", async (req, res) => {

  const { material, cantidad, usuario } = req.body;

  const fecha = new Date();

  const semana = Math.ceil(fecha.getDate() / 7);

  const registro = new Registro({
    usuario,
    material,
    cantidad,
    semana,
    mes: fecha.getMonth() + 1,
    año: fecha.getFullYear()
  });

  await registro.save();

  res.json({ msg: "Registro guardado" });

});
