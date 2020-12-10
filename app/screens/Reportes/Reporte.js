import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Reporte(props) {
    const { navigation , route} = props;
    const {id, name} = route.params;
    const [pet, setPet] = useState(null);

    navigation.setOptions({ title: name });

    useEffect(() => {
        db.collection("pets")
        .doc(id)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            setPet(data);
        }); 
    }, []);

    return (
        <View>
            <Text>Pet info...</Text>
        </View>
    );
}

const styles = StyleSheet.create({})
