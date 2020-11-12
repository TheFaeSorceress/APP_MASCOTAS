import React, {useState, useRef} from "react";
import {View} from "react-native";
//import Toast from "react-native-easy-toast";
//import Loading from "../../components/Loading";
import NuevoReporteForm from "../Reportes/NuevoReporteForm";

export default function NuevoReporte(props){
    const {navigation} = props;
    //const [isLoading, setIsLoading] = useState(false);
    //const toastRef = useRef();
    return(
        <View>
            <NuevoReporteForm
                //toastRef={toastRef}
                //setIsLoading={setIsLoading}
                navigation={navigation}
            />
    
            
        </View>
    );
}

//<Toast ref={toastRef} position= "center" opacity={0.9}/>
//<Loading isVisible={isLoading} text="Creando reporte"/>