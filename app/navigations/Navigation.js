import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";

import MiCuentaStack from "../navigations/MiCuentaStack"
import MapaStack from "./MapaStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="micuenta"
                tabBarOptions={{
                    inactiveTintColor:"#646464",
                    activeTintColor: "#FF7E00"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >
                <Tab.Screen name="micuenta" 
                component={MiCuentaStack}
                options={{title: "Mi Cuenta"}}/>
                <Tab.Screen name="mapa" 
                component={MapaStack}
                options={{title: "Mapa"}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route, color){
    let iconName;
    switch (route.name) {
        case "mapa":
            iconName = "compass-outline"
            break;
        case "micuenta":
            iconName = "account-circle"
            break;
        default:
            break;         
    }
    return(
    <Icon type = "material-community" name={iconName}
    size={22} color={color}/>
    );
}