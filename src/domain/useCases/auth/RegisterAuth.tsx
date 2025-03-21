import { AuthRepositoryImpl } from "../../../data/repositories/AuthRepository";
import { User } from "../../entities/User";

const authRepository = new AuthRepositoryImpl();

export const RegisterAuthUseCase = async (user: User) => {
  return await authRepository.register(user);
};
