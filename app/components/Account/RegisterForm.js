import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());

    const onSubmit = () => {
        if(
        isEmpty(formData.email) || 
        isEmpty(formData.password) || 
        isEmpty(formData.repeatPassword)
        ){
            //console.log("Todos los campos son obligatorios");
            toastRef.current.show("Todos los campos son obligatorios");
        }else if(!validateEmail(formData.email)){
            console.log("El email no es correcto");
        }else if(formData.password !== formData.repeatPassword){
            console.log("Las contraseñas tienen que ser iguales");
        }else if(size(formData.password < 6)){
            console.log("La contraseña debe tener al menos 6 caractéres");
        }else{
            console.log("Ok");
        }
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    };

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
            <Input
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "repeatPassword")}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button
                title="Registrarse"
                containerStyle={styles.containerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
                style={{ margin: 15 }}
            />
        </View>
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
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",

        marginTop: 30,

    },
    inputForm: {
        margin: 15,
        width: "100%",
        height: 20,
    },
    containerRegister: {
        marginTop: 40,
        width: "100%",
    },
    btnRegister: {
        backgroundColor: "#FF7E00",
        width: "100%",
    },
    iconRight: {
        color: "#c1c1c1",
    },
});