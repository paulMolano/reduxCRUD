import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//import Swal from 'sweetalert2';

//Muestra alerta
export function mostrarAlerta(alerta){
    return (dispatch)=>{
        dispatch(crearAlerta(alerta))

        setTimeout(() => {
            dispatch(ocultarAlerta())
        }, 2000);
    }
}

const crearAlerta = alerta =>({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

const ocultarAlerta = ()=>({
    type: OCULTAR_ALERTA
})