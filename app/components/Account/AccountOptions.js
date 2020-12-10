import React from 'react';
import {StyleSheet, View} from "react-native"
import {ListItem} from "react-native-elements"
import {map} from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function AccountOptions(){
    
    const menuOptions = generateOptions();
    const navigation = useNavigation();
    return(
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                />
            ))}
            <ListItem
                    title={"Mostrar mis reportes"}
                    leftIcon={{
                        type: "material-community",
                        name: "card-text-outline",
                        color: "#ccc",
                    }}
                    rightIcon={{
                        type: "material-community",
                        name: "chevron-right",
                        color: "#ccc",
                    }}
                    containerStyle={styles.menuItem}
                    onPress = {() => navigation.navigate("mis_reportes")}
                />
        </View>
    );
}

function generateOptions(){
    
    return[
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc" 
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc" 
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc"
        }
    ];
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    }
});