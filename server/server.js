const express = require("express");
const passport = require("passport");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");

const app = express();
const server = http.createServer(app);

/**
 * Importar rutas
 */
const usersRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 3000;

// Middlewares
app.use(logger("dev")); // Log requests to the console (DEBUG)
app.use(express.json()); // Support JSON encoded bodies
app.use(express.urlencoded({ extended: true })); // Support URL encoded bodies
app.use(cors({
  origin: '*', // Permite todas las conexiones (solo para desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));



// Configura express-session
app.use(
  session({
    secret: "9B1C7C2AE7BC88D3CF3CE49BF3E6F", // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }, // Cambia a `true` si usas HTTPS
  })
);

// Inicializa Passport y la sesión de Passport
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by"); // Disable the X-Powered-By header in responses

// Rutas principales
app.get("/", (req, res) => {
  res.send("Estas en la ruta raiz del backend.");
});

app.get("/test", (req, res) => {
  res.send("Estas en la ruta TEST");
});

// Rutas de usuarios
app.use('/api', usersRoutes);

// Ruta adicional para /api/users
app.get("/api/users", (req, res) => {
  res.send("Esta es la ruta de usuarios");
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

// Iniciar el servidor
server.listen(3000, '0.0.0.0', () => { // Escucha en todas las interfaces
  console.log(`Servidor en http://localhost:3000`);
});
