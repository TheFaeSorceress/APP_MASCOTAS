import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, requireNativeComponent } from 'react-native';
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function ListPets(props) {
    const {pets} = props;

    return (
        <View>
            {size(pets) > 0 ? (
                <FlatList
                    data={pets}
                    renderItem={(pet) => <Pet pet ={pet}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <View style={styles.loaderPets}>
                    <ActivityIndicator size="large"/>
                    <Text>
                        Cargando Reportes
                    </Text>
                </View>
            )}
        </View>
    );
}

function Pet(props){
    
    const{pet} = props;
    const { images, location, createAt } = pet.item;
    const imagePet = images[0];

    const goPet = () => {
        
    };

    return(
        <TouchableOpacity onPress={goPet}>
            <View style={styles.viewPet}>
                <View styles={styles.viewPetImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff"/>}
                        source={
                            imagePet
                            ? {uri: imagePet}
                            : require("../../../assets/img/no-image.png")
                        }
                        style={styles.imagePet}
                    />
                </View>
                <View>
                    <Text>Aquí va el nombre</Text>
                    <Text>Aquí va la dirección</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loaderPets: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    viewPet: {
        flexDirection: "row",
        margin: 10,
    },
    viewPetImage: {
        marginRight: 15,
    },
    imagePet:{
        width: 80,
        height: 80,
    },
    reporteDate: {
        paddingTop: 2,
        color: "grey",
    },
})
