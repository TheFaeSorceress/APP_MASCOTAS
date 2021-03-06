import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListPets from "../Reportes/ListPets";

const db = firebase.firestore(firebaseApp);

export default function Reportes(props) {
    const { navigation } = props;
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [totalPets, setTotalPets] = useState(0);
    const [startPets, setStartPets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const limitPets = 10;

    useEffect (() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useFocusEffect(
        useCallback(() =>{
            db.collection("pets")
            .get()
            .then((snap) => {
                const resultFinal = resultPets.filter(mascota => mascota.control === 0);
                setTotalPets(snap.size);
            });

            const resultPets = [];

            db.collection("pets")
            .orderBy("createAt", "desc")
            .limit(limitPets)
            .get()
            .then((response) => {
                console.log(response.docs);
                setStartPets(response.docs[response.docs.length -1]);
                response.forEach((doc) => {
                    const pet = doc.data();
                    pet.id = doc.id;
                    console.log(pet);
                    resultPets.push(pet);
                });
                const resultFinal = resultPets.filter(mascota => mascota.control === 0);
                setPets(resultPets);
            });
        }, [])
    );


    const handleLoadMore = () => {
        const resultPets = [];
        pets.length < totalPets && setIsLoading(true);
        db.collection("pets")
            .orderBy("createAt", "desc")
            .startAfter(startPets.data().createAt)
            .limit(limitPets)
            .get()
            .then(response => {
                if(response.docs.lenght > 0){
                    setStartPets(response.docs[response.docs.length - 1]);
                }else{
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const pet = doc.data();
                    pet.id = doc.id;
                    resultPets.push({pet});
                });

                setPets([...pets, ...resultPets]);

            });
    };

    

    useEffect(() => {
        return () => {
        }
    })

    return (
        
        <View style={styles.viewBody}>
            <ListPets
                pets = {pets}
                handleLoadMore = {handleLoadMore} 
                isLoading = {isLoading}
            />
            <Icon 
            reverse
            type="material-community"
            name="plus"
            color="#EDB506"
            containerStyle = {styles.btnContainer}	
            onPress = {() => navigation.navigate("nuevo_reporte")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 25,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,

    },
})

