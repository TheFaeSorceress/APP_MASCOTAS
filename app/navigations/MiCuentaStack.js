import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Micuenta from "../screens/Account/Micuenta";
import Reportes from "../screens/Reportes";

const Stack = createStackNavigator();

export default function MiCuentaStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="micuenta"
                component={Micuenta}
                options={{title:"Mi Cuenta"}}
            />
            <Stack.Screen
                name="reportes"
                component={Reportes}
                options={{title:"Reportes"}}
            />
        </Stack.Navigator>
    )

}