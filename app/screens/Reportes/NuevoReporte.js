import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
//import Loading from "../../components/Loading";
import NuevoReporteForm from "../Reportes/NuevoReporteForm";

export default function NuevoReporte(props) {
    const { navigation, params, route } = props;
    

    let mascota, setAnimales;
    if (route.params) {
        mascota = route.params.mascota;
        setAnimales = route.params.setAnimales;
    }

    //const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    return (
        <View>
            <NuevoReporteForm
                mascota={mascota}
                setAnimales={setAnimales}
                toastRef={toastRef}
                //setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position= "center" opacity={0.9}/>
        </View>
    );
}

//
//<Loading isVisible={isLoading} text="Creando reporte"/>