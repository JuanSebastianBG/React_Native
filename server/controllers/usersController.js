const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, myUser) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al consultar el usuario",
          error: err,
        });
      }

      if (!myUser) {
        //Cliente sin autorización para realizar  la
        petición;
        return res.status(401).json({
          success: false,
          message: "El email no existe en la base de datos",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );

        const data = {
          id: myUser.id,
          email: myUser.email,
          name: myUser.name,
          lastname: myUser.lastname,
          image: myUser.image,
          phone: myUser.phone,
          session_token: `JWT ${token}`,
        };
        return res.status(201).json({
          success: true,
          message: "Usuario autenticado ",
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }
    });
  },

  register(req, res) {
    const user = req.body;
    console.log("Datos recibidos en el servidor:", user); // Depuración

    if (!user || !user.password) {
      console.log("Error: Datos incompletos o inválidos");
      return res.status(400).json({
        success: false,
        message: "Datos incompletos o inválidos",
      });
    }

    User.create(user, (err, data) => {
      if (err) {
        console.log("Error en la base de datos:", err); // Depuración
        return res.status(501).json({
          success: false,
          message: "Error al crear el usuario",
          error: err,
        });
      }
      console.log("Usuario creado:", data); // Depuración
      return res.status(201).json({
        success: true,
        message: "Usuario creado",
        data: data,
      });
    });
  },
};
