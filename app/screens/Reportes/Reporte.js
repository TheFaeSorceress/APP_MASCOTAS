import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimension.get("window").width;

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

    if(!pet) return <Loading isVisible={true} text="Cargando..." />

    return (
       <ScrollView vertical style={styles.viewBody}>
            <Carousel
                arrayImages={pet.images}
                height={250}
                width={screenWidth}
            />
       </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
