import React, { useState, useRef } from "react";
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

export default function NuevoReporteForm(props) {
    const [isVisibleMap, setIsVisibleMap] = useState(false);

    return (
        <ScrollView style={StyleSheet.ScrollView}>
            <FormAdd
                mascota={props.mascota}
                setAnimales={props.setAnimales}
                setIsVisibleMap={setIsVisibleMap}
                navigation={props.navigation}
            />
            <UploadImage />
            <Button
                title="Reportar"
                containerStyle={styles.containerReportar}
                buttonStyle={styles.btnReportar}
                style={{ margin: "15px" }}
                onPress={() => {
                    console.log("llegoHastaBoton");
                    setAnimales(mascota);
                }}
            />
            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} />
        </ScrollView>
    );
}

function FormAdd(props) {
    console.log("PROPS");
    console.log(props);
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
    console.log("MASCOTA");
    console.log(mascota);


    const onChange = (e) => {
        console.log(e);
        console.log(e.target.name);
        console.log(e.target.value);
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
                    console.log(itemValue);
                    mascota.tipoReporteID = itemValue;
                    setMascota({ ...mascota });
                    console.log(mascota);
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
                value={mascota.Dir}
                onChange={
                    (e) => {
                        mascota.Dir = e.target.value
                        setMascota({ ...mascota });
                    }
                }
                name={"Dir"}

            />
            <Button
                onPress={() => {
                    console.log("llegoHastaBoton");
                    setAnimales(mascota);
                    navigation.navigate("reportes");
                }}
                title={mascota.index >= 0 ? "Guardar" : "Reportar"}
                buttonStyle={styles.btnReportar}
            />
        </View>
    );
}

function UploadImage() {
    const ImageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        console.log(resultPermissions);
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
    const { isVisibleMap, setIsVisibleMap } = props;

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <Text>Mapa</Text>
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
});
