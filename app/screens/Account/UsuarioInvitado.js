import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";

export default function UsuarioInvitado() {
    const navigation = useNavigation();

    return (
        <ScrollView
            style={{ backgroundColor: "red" }}
            centerContent={true}
        >
            <Image
                source={require("../../../assets/img/user-guest.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>
                Consulta tu perfil de PetFinder
            </Text>
            <Text style={styles.description}>
                Reporta animales en situación de extravío y/o calle
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title="Ver tu perfil"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40,
        backgroundColor: "red",
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        textAlign: "center",
        marginBottom: 20,
    },
    viewBtn: {
        flex: 1,
        alignItems: "center",
    },
    btnStyle: {
        backgroundColor: "#FF7E00"
    },
    btnContainer: {
        width: "50%",
    },
})

