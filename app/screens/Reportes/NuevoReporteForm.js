import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Alert,
    Dimensions,
    Picker,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "../../components/Modal";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function NuevoReporteForm(props) {
    const {toastRef} = props;
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationPet, setLocationPet] = useState(null);
    const [imageSelected, setImageSelected] = useState([]);

    console.log(imageSelected);

    return (
        <ScrollView style={StyleSheet.ScrollView}>
            <FormAdd
                mascota={props.mascota}
                setAnimales={props.setAnimales}
                setIsVisibleMap={setIsVisibleMap}
                navigation={props.navigation}
            />
            <UploadImage 
                toastRef={toastRef}
                ImageSelect={imageSelected}
                setImageSelected={setImageSelected}
            />
            <Button
                title="Reportar"
                containerStyle={styles.containerReportar}
                buttonStyle={styles.btnReportar}
                style={{ margin: 15 }}
                onPress={() => {
                    setAnimales(mascota);
                }}
            />
            <Map 
                isVisibleMap={isVisibleMap} 
                setIsVisibleMap={setIsVisibleMap} 
                setLocationPet={setLocationPet}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function FormAdd(props) {
    const { setAnimales, navigation } = props;
    const [mascota, setMascota] = useState(
        !props.mascota
            ? {
                tipoReporteID: -1,
                EspecieID: -1,
                TamanoID: -1,
                ColorID: -1,
                Direccion: "",
            }
            : props.mascota
    );


    const { setIsVisibleMap } = props;


    const onChange = (e) => {
        mascota[e.target.name] = e.target.value;
        setMascota(mascota);
    }

    return (
        <View style={styles.viewForm}>
            <Input
                value={mascota.name}
                placeholder="Nombre de la mascota"
                containerStyle={styles.input}
                onChange={
                    (e) => {
                        mascota.name = e.target.value
                        setMascota({ ...mascota });
                    }
                }
            />
            <Text>Tipo de Reporte:</Text>
            <Picker
                style={{ height: 30, width: "100%" }}
                value={mascota.tipoReporteID}
                onValueChange={(itemValue, itemIndex) => {
                    mascota.tipoReporteID = itemValue;
                    setMascota({ ...mascota });
                }
                }>

                <Picker.Item label="Extravío" value={1} />
                <Picker.Item label="Calle" value={2} />
            </Picker>
            <Text>Especie:</Text>
            <Picker
                style={{ height: 30, width: "100%" }}
                onValueChange={(itemValue, itemIndex) => {
                    mascota.EspecieID = itemValue
                    setMascota({ ...mascota });
                }}
                selectedValue={mascota.EspecieID}
                name={"EspecieID"}

            >
                <Picker.Item label="Perro" value={1} />
                <Picker.Item label="Gato" value={2} />
                <Picker.Item label="Conejo" value={3} />
                <Picker.Item label="Hurón" value={4} />
            </Picker>
            <Text>Tamaño:</Text>
            <Picker
                selectedValue={mascota.TamanoID}
                style={{ height: 30, width: "100%" }}
                onValueChange={(itemValue, itemIndex) => {
                    mascota.TamanoID = itemValue
                    setMascota({ ...mascota });
                }}
                name={"TamanoID"}
            >
                <Picker.Item label="Chico" value={1} />
                <Picker.Item label="Mediano" value={2} />
                <Picker.Item label="Grande" value={3} />
            </Picker>
            <Text>Color:</Text>
            <Picker
                selectedValue={mascota.ColorID}
                style={{ height: 30, width: "100%" }}
                onValueChange={(itemValue, itemIndex) => {
                    mascota.ColorID = itemValue
                    setMascota({ ...mascota });
                }}
                name={"ColorID"}

            >
                <Picker.Item label="Café" value={1} />
                <Picker.Item label="Negro" value={2} />
                <Picker.Item label="Blanco" value={3} />
                <Picker.Item label="Amarillo" value={4} />
                <Picker.Item label="Otro" value={5} />
            </Picker>
            <Input
                placeholder="Descripción"
                containerStyle={styles.input}
                value={mascota.Descripcion}
                onChange={
                    (e) => {
                        mascota.Descripcion = e.target.value
                        setMascota({ ...mascota });
                    }
                }
                name={"Descripcion"}

            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color:"#c2c2c2",
                    onPress: () => setIsVisibleMap(true),
                }}
                value={mascota.Dir}
                onChange={
                    (e) => {
                        mascota.Dir = e.target.value
                        setMascota({ ...mascota });
                    }
                }
                name={"Dir"}

            />
        </View>
    );
}

function UploadImage(props) {
    const {toastRef, setImageSelected, imageSelected} = props;
    const ImageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        if(resultPermissions === "denied"){
            toastRef.current.show(
                "Debe aceptar los permisos de la galeria para seleccionar imagen de la mascota",
                3000
            );
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3],
            });
            if(result.cancelled){
                toastRef.current.show(
                    "Has cerrado la galeria sin seleccionar ninguna imagen",
                    3000,
                )
            }else{
                //console.log(result.uri);
                setImageSelected(result.uri);
            }
        }
    };
    return (
        <View style={styles.viewImages}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={ImageSelect}
            />
        </View>
    );
}

function Map(props) {
    const { isVisibleMap, setIsVisibleMap, setLocationPet, toastRef } = props;
    const [location, setLocation] = useState(null);
    

    useEffect(() => {
        (async ()=> {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );
            const statusPermissions = resultPermissions.permissions.location.status;
            if(statusPermissions !== "granted"){
                toastRef.current.show(
                    "Tienes que aceptar los permisos de localizacion para guardar la direccion del reporte",
                    3000
                );
            }else{
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                })
            }
        })()
        return () => {
            
        }
    }, [])

    const confirmLocation = () => {
        console.log(location)
        setLocationPet(location);
        toastRef.current.show("Localizacion guardada correctamente");
        setIsVisibleMap(false);
    }

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker 
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                        <Button 
                            title="Guardar Ubicacion" 
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={() => confirmLocation()}
                        />
                        <Button 
                            title="Cancelar Ubicacion" 
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={() => setIsVisibleMap(false)}
                        />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    containerReportar: {
        marginTop: 40,
        width: "100%",
    },
    btnReportar: {
        backgroundColor: "#FF7E00",
        width: "100%",
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    mapStyle: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d",
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    }
});
