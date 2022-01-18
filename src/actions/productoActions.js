import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto());
        
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto)

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true))

            //alerta de error
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

//Inicia el agregar producto colocando el estado loading en true
const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo un error
const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Función que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async(dispatch)=>{
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            
            dispatch(descargarProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            //si hay un error cambiar el state
            dispatch(descargarProductosError())

            //alerta de error
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al descargar los productos'
            })
            
        }
    }
}

//Iniciar la descarga de productos
const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

//Iniciar la descarga de productos
const descargarProductosExitosa = productos =>({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

//Iniciar la descarga de productos
const descargarProductosError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


//Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async(dispatch)=>{
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado con éxito.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
            //alerta de error
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al descargar los productos'
            })
            
        }
    }
}

const obtenerProductoEliminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = ()=>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//Colocar producto en edición
export function obtenerProductoEditar(producto){
    return(dispatch)=>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto =>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto

})

//edita un registro en la api y state
export function editarProductoAction(producto){
    return async (dispatch)=>{
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se editó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
            //alerta de error
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al editar el producto'
            })
            
        }
    }
}

const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})