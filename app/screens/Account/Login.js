import React from "react";
import { StyleSheet, View, ScrollView, Image, Button, ImageBackground } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeProvider, Input, Text } from 'react-native-elements';

export default function Login() {
    const navigation = useNavigation();
    return (



        <ScrollView style={{
            backgroundColor: "#EDB506",
            justify: "Center",
            textAlign: "center",
        }}>
            <ImageBackground
                source={require("../../../assets/img/27 Super Pretty iPhone 8 Plus Wallpapers _ Preppy Wallpapers.jpg")}
                resizeMode="contain"
                style={styles.background}
            >
                <View style={styles.viewContainer}>
                    <Image
                        source={require("../../../assets/img/logo_petfinder_letras_blanco.png")}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <div style={{
                        paddingTop: "85%",
                    }}>

                        <Button
                            title='Registrarme'
                            color="white"
                            style={styles.button}
                            onPress={() => navigation.navigate("register")}
                        >
                        </Button>

                        <Button
                            title='Ingresar'
                            color="#EDB506"
                            style={styles.button}
                            onPress={() => navigation.navigate("ingreso")}

                        >
                        </Button>

                    </div>
                </View>
            </ImageBackground>
        </ScrollView >
    );
}

function CreateAccount() {
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}>
                Registrate aquí
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({

    background: {
        width: "100%",
    },
    button: {
        width: "100%",
        backgroundColor: "red",
        margin: "10px",
    },
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewContainer: {
        display: "flex",
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
        color: "#FF7E00",
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#FF7E00",
        margin: 40,
    },
});