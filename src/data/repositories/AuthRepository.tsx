import { AxiosError } from "axios";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import ApiDelivery from "../sources/remote/api/apiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class AuthRepositoryImpl implements AuthRepository {
  async register(user: User): Promise<ResponseApiDelivery> {
    try {
      console.log("URL completa:", `${ApiDelivery.defaults.baseURL}/users/create`);
      const response = await ApiDelivery.post("api/users/create", user);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error("Detalles del error:", {
        message: e.message,
        code: e.code,
        request: e.request,
        response: e.response?.data
      });
      return { success: false, message: "Error de conexión" };
    }
  }

  async login(email: string, password: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>(
        "api/users/login",
        {
          email: email,
          password: password,
        }
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("error" + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
