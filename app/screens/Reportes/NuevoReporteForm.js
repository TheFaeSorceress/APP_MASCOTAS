import React,{ useState, useRef} from "react";
import {StyleSheet, View, Text, ScrollView, Alert, Dimensions, Picker} from "react-native";
import {Icon, Avatar, Image, Input, Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "../../components/Modal";

export default function NuevoReporteForm(props){
    const[isVisibleMap, setIsVisibleMap] = useState(false);
    return(
        <ScrollView style={StyleSheet.ScrollView}>
            <FormAdd
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage/>
            <Button
                title="Reportar"
                containerStyle={styles.containerReportar}
                buttonStyle={styles.btnReportar}
                style={{ margin: "15px" }}
            />
            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap}/>
        </ScrollView>
    );
}


function FormAdd(props){
    const{
        setIsVisibleMap
     } = props;
    return(
        <View style = {styles.viewForm}>
            <Input
                placeholder="Nombre de la mascota"
                containerStyle={styles.input}
                //Descripción --Input
                //Foto - Cámara
                //Ubicación --Google Maps
            />
            <Text>
                Tipo de Reporte:
            </Text>
            <Picker
            style={{height: 30, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
            {}                      
            }>
                <Picker.Item label="Extravío" value="extravio" />
                <Picker.Item label="Calle" value="calle" />
            </Picker>
            <Text>
                Especie:
            </Text>
            <Picker
            style={{height: 30, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
            {}
            }>
                <Picker.Item label="Perro" value="perro" />
                <Picker.Item label="Gato" value="gato" />
                <Picker.Item label="Conejo" value="conejo" />
                <Picker.Item label="Hurón" value="huron" />
            </Picker>
            <Text>
                Tamaño:
            </Text>
            <Picker
            style={{height: 30, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
            {}
            }>
                <Picker.Item label="Chico" value="chico" />
                <Picker.Item label="Mediano" value="mediano" />
                <Picker.Item label="Grande" value="grande"/>
            </Picker>
            <Text>
                Color:
            </Text>
            <Picker
            style={{height: 30, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
            {}
            }>
                <Picker.Item label="Café" value="cafe" />
                <Picker.Item label="Negro" value="negro" />
                <Picker.Item label="Blanco" value="blanco" />
                <Picker.Item label="Amarillo" value="amarillo" />
                <Picker.Item label="Otro" value="otro" />
            </Picker>
            <Input
                placeholder="Descripción"
                containerStyle={styles.input}
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
            />   
        </View>
    )
}

function UploadImage(){
    const ImageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        console.log(resultPermissions)
    };
    return(
        <View
            style={styles.viewImages}
        >
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={ImageSelect}
            />
        </View>
    )
}

function Map(props){
    const {isVisibleMap, setIsVisibleMap} = props;

    return(
        <Modal isVisible ={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <Text>
                Mapa
            </Text>
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
    input:{
        marginBottom:10,
    },
    containerReportar: {
        marginTop: 40,
        width: "100%",
    },
    btnReportar: {
        backgroundColor: "#FF7E00",
        width: "100%",
    },
    viewImages:{
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