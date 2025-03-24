// routes/userRoutes.js
const userController = require('../controllers/usersController');

module.exports = (app) => {
  app.post('/api/users/create', userController.register); // Ruta completa con /api
  app.post('/api/users/login', userController.login);
};