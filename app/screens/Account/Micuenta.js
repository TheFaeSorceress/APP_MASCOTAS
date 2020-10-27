import React, { useState, useEffect } from "react";

import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UsuarioInvitado from "./UsuarioInvitado";
import UsuarioLogger from "./UsuarioLogger";


export default function Micuenta(){
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    if(login == null) return <Loading isVisible={true} text="Cargando..."/>;

    return login ? <UsuarioLogger/> : <UsuarioInvitado />;
}