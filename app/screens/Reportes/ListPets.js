import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, requireNativeComponent } from 'react-native';
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListPets(props) {
    const {pets, handleLoadMore, isLoading} = props;
    const navigation = useNavigation();

    return (
        <View>
            {size(pets) > 0 ? (
                <FlatList
                    data={pets}
                    renderItem={(pet) => <Pet pet ={pet} navigation={navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<FooterList isLoading={isLoading}/>}
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
    
    const{ pet, navigation } = props;
    const { id, images, name, descripcion, direccion } = pet.item;
    const imagePet = images ? images [0] : null;

    const goPet = () => {
        navigation.navigate("reporte", {
            id,
            name,
        });
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
                    <Text style={styles.petName}>{name}</Text>
                    <Text style={styles.petDescripcion}>{direccion}</Text>
                    <Text style={styles.petDescripcion}>{descripcion}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function FooterList(props){
    const {isLoading} = props;
    if(isLoading){
        return (
            <View style={styles.loaderPets}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }else{
        return(
            <View style={styles.notFoundPets}>
                <Text>No quedan restaurantes por cargar</Text>
            </View>
        )
    }
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
    petName: {
        fontWeight: "bold",
        marginLeft: 5,
    },
    petDescripcion: {
        paddingTop:2,
        color: "grey",
        marginLeft: 5,
    },
    notFoundPets: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    }
})
