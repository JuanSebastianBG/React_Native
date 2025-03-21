import React, { useState } from "react";
import { RegisterAuthUseCase } from "../../../domain/useCases/auth/RegisterAuth";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      console.log("Datos del formulario:", values); // Depuración
      const response = await RegisterAuthUseCase(values);
      console.log("Respuesta del servidor:", response); // Depuración
      if (response.success) {
        console.log("Usuario registrado correctamente");
      } else {
        console.log("Error al registrar el usuario:", response.message);
      }
    }
  };
  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("El nombre es requerido");
      return false;
    }
    if (values.lastname === "") {
      setErrorMessage("El apellido es requerido");
      return false;
    }
    if (values.email === "") {
      setErrorMessage("El correo es requerido");
      return false;
    }
    if (values.phone === "") {
      setErrorMessage("El teléfono es requerido");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("La contraseña es requerida");
      return false;
    }
    if (values.confirmPassword === "") {
      setErrorMessage("La confirmación de contraseña es requerida");
      return false;
    }
    if (values.password !== values.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  return {
    ...values,
    onChange,
    register,
    errorMessage,
  };
};

export default RegisterViewModel;
