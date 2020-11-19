import React from 'react';
import { StyleSheet, View, Text} from "react-native";
import {Avatar} from "react-native-elements";

export default function InfoUser(){

    return(
    <View style ={styles.viewUserInfo}>
        <Avatar
            size ="large"
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            showEditButton
            containerStyle={styles.userInfoAvatar}>
        </Avatar>
        <View>
            <Text style={styles.displayName}>
                Brenda Valdés
            </Text>
            <Text>
                brenda.leticia.vp@gmail.com
            </Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
        backgroundColor: "#e3e3e3",
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5,
    },
});

