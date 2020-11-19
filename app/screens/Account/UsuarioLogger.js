import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {Button} from "react-native-elements";
//import Toast from "react-native-easy-toast";
//import * as firebase from "firebase";
///import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser"
import AccountOptions from "../../components/Account/AccountOptions";


export default function UsuarioLogger(){
    return(
        <View style={styles.viewUserInfo}>
            <InfoUser/>
            <AccountOptions/>
            <Button title= "Cerrar Sesión"
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
            />
        </View>
    );
}
// onPress={() => firebase.auth().signOut()}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor:"#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,

    },
    btnCloseSessionText: {
        color: "#FF7E00"
    }
});