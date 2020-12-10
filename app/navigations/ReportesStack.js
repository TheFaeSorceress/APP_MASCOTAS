import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Reportes from "../screens/Reportes/Reportes";
import NuevoReporte from "../screens/Reportes/NuevoReporte";
import Reporte from "../screens/Reportes/Reporte";

const Stack = createStackNavigator();

export default function ReportesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="reportes"
                component={Reportes}
                options={{title:"Reportes"}}
            />
            <Stack.Screen
                name="nuevo_reporte"
                component={NuevoReporte}
                options={{title:"Nuevo Reporte"}}
            />
            <Stack.Screen
                name="reporte"
                component={Reporte}
            />
        </Stack.Navigator>
    )

}