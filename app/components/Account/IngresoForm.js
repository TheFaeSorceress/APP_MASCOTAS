import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());

    const onSubmit = () => {
        console.log(formData);
        console.log(validateEmail(formData.email));
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <div style={{ marginTop: "30px" }}  >
                <Button
                    title="Ingresar"
                    containerStyle={styles.containerRegister}
                    buttonStyle={{ backgroundColor: "#FF7E00", }}
                    onPress={onSubmit}
                />
                <Button
                    title="Ingresar con cuenta Google"
                    containerStyle={styles.containerRegister}
                    buttonStyle={{ backgroundColor: "#16974F", }}
                    onPress={onSubmit}
                    color={"green"}

                />
                <Button
                    title="Ingresar con Facebook"
                    containerStyle={styles.containerRegister}
                    buttonStyle={{ backgroundColor: "#355BA6", }}
                    onPress={onSubmit}
                />
            </div>
        </View >
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        //justifyContent: "center",
        marginTop: 30,

    },
    inputForm: {
        margin: "15px",
        width: "100%",
        height: 20,
    },
    containerRegister: {
        marginTop: 15,
        width: "100%",
    },
    btnRegister: {
        backgroundColor: "#FF7E00",
    },
    iconRight: {
        color: "#c1c1c1",
    },
});