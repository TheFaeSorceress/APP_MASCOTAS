import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import {map} from "lodash";
import {Rating, ListItem, Icon} from "react-native-elements";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

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
            <TitleReporte 
                name={pet.name}
                descripcion={pet.descripcion}
            />
            <ReporteInfo
                location={pet.location}
                name={pet.name}
                address={pet.address}
            />
       </ScrollView>
    );
}

function TitleReporte(props){
    const {name, descripcion} = props;
    return (
        <View style={styles.viewReporteTitle}>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.nameReporte}>{name}</Text>
            </View>
            <Text style={styles.descripcionReporte}>{descripcion}</Text>
        </View>
    )
}

function ReporteInfo(props){
    const {location, name, address} = props;

    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
            iconType: "material-community",
            action: null,
        },
    ];

    return(
        <View style={styles.viewPetInfo}>
            <Text style={styles.petInfoTitle}>
                Información sobre la mascota
            </Text>
            <Map location={location} name={name} height={100}/>
            {map(listInfo, (item) => {
                <ListItem></ListItem>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewReporteTitle: {
        padding: 15
    },
    nameReporte:{
        fontSize: 20,
        fontWeight: "bold"
    },
    descripcionReporte:{
        marginTop: 5,
        color: "grey"
    },
    viewPetInfo: {
        margin: 15,
        marginTop: 25
    },
    petInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    }
});
