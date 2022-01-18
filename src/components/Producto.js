import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

//redux
import {useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
    const{nombre, precio, id} = producto;
    
    
    //Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();
    
    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = (id) => {
        
        //preguntar al usuario
        Swal.fire({
        title: '¿Estás seguro?',
        text: "El producto será eliminado de forma permanente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            
            //pasarlo al action
            dispatch(borrarProductoAction(id))
            
        }
    })
    
}
//Para redireccionar de forma programada
let navigate = useNavigate();
const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto))
    navigate(`/productos/editar/${producto.id}`)
}

return (
    <>
            <tr>
                <td>{nombre}</td>
                <td><span className='font-weight-bold'>$ {precio}</span></td>
                <td className='acciones'>
                    <button 
                        type='button' 
                        className='btn btn-primary mr-2'
                        onClick={()=>redireccionarEdicion(producto)}>Editar</button>
                    <button 
                        type='button' 
                        className='btn btn-danger'
                        onClick={()=>confirmarEliminarProducto(id)}>Eliminar</button>
                </td>
            </tr>
        </>
    )
}

export default Producto
