import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Micuenta from "../screens/Account/Micuenta";
import Reportes from "../screens/Reportes/Reportes";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import Ingresar from "../screens/Account/Ingresar";
import UsuarioLogged from "../screens/Account/UsuarioLogger";
import MisReportes from "../screens/Account/MisReportes";
import Reporte from "../screens/Reportes/Reporte";

const Stack = createStackNavigator();

export default function MiCuentaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="micuenta"
                component={Micuenta}
                options={{ title: "Mi Cuenta" }}
            />
            <Stack.Screen
                name="reportes"
                component={Reportes}
                options={{ title: "Reportes" }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Iniciar Sesión" }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registro" }}
            />
            <Stack.Screen
                name="ingreso"
                component={Ingresar}
                options={{ title: "Ingresar" }}
            />
            <Stack.Screen
                name="usuario_loggeado"
                component={UsuarioLogged}
                options={{ title: "Mi Perfil" }}
            />
            <Stack.Screen
                name="mis_reportes"
                component={MisReportes}
                options={{ title: "Mis Reportes" }}
            />
            <Stack.Screen
                name="reporte"
                component={Reporte}
            />
        </Stack.Navigator>
    )

}