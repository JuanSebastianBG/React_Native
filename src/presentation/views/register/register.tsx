import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, ToastAndroid } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./viewModel";
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";

export const RegisterScreen = () => {
  const {
    name,
    lastname,
    email,
    phone,
    password,
    confirmPassword,
    errorMessage,
    onChange,
    register,
  } = useViewModel();

  useEffect(() => {
    if (errorMessage !== "") ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/bg.png")}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/user_image.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGISTRARSE</Text>

          <CustomTextInput
            image={require("../../../../assets/user.png")}
            placeholder="Nombres"
            value={name}
            keyboardType="default"
            property="name"
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/my_user.png")}
            placeholder="Apellidos"
            value={lastname}
            keyboardType="default"
            property="lastname"
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/email.png")}
            placeholder="Correo electrónico"
            value={email}
            keyboardType="email-address"
            property="email"
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/phone.png")}
            placeholder="Teléfono"
            value={phone}
            keyboardType="numeric"
            property="phone"
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/password.png")}
            placeholder="Contraseña"
            value={password}
            secureTextEntry={true}
            keyboardType="default"
            property="password"
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/confirm_password.png")}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            secureTextEntry={true}
            keyboardType="default"
            property="confirmPassword"
            onChangeText={onChange}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="GUARDAR" onPress={() => register()} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
