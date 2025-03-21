import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: "http://localhost:3000", // URL base del servidor
  headers: {
    "Content-Type": "application/json", // Asegúrate de enviar JSON
  },
});

export default ApiDelivery;
