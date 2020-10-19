import React, { useState, useEffect } from "react";
import {View, Text} from "react-native";
import * as firebase from "firebase";
import UsuarioInvitado from "./UsuarioInvitado";
import UsuarioLogger from "./UsuarioLogger";


export default function Micuenta(){
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    if(login == null) return <Text>Cargando...</Text>;

    return login ? <UsuarioLogger/> : <UsuarioInvitado />;
}