import React from "react";
import {StyleSheet, View, Text, ScrollView, Alert, Dimensions} from "react-native";
import {Icon, Avatar, Image, Input, Button} from "react-native-elements";

export default function NuevoReporteForm(){
    return(
        <ScrollView style={StyleSheet.ScrollView}>
            <FormAdd/>
        </ScrollView>
    );
}

function FormAdd(props){
    return(
        <View style = {styles.viewForm}>
            <Input
                placeholder="Nombre de la mascota"
                containerStyle={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input:{
        marginBottom:10,
    }
});