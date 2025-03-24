const mysql = require("mysql");

const db = mysql.createConnection({
  host: "127.0.0.1",  // Solo la IP o dominio, sin puerto
  port: 3306,              // Puerto de MySQL (por defecto es 3306)
  user: "root",
  password: "",            // Asegúrate de que coincida con tu contraseña de MySQL
  database: "nodejs_base1",
});

db.connect(function (err) {
  if (err) {
    console.error("Detalles del error:", {
      code: err.code,
      errno: err.errno,
      stack: err.stack
    });
    throw err;
  }
  console.log("¡Conectado a MySQL!");
});

module.exports = db;