import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: "http://192.168.0.9:3000", // Sin barra al final
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiDelivery;
