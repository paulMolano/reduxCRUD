import React, {useEffect} from 'react'
import Producto from './Producto';

//Redux
import {useDispatch, useSelector} from 'react-redux';

import { obtenerProductosAction } from '../actions/productoActions';


const Productos = () => {
    //Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    useEffect(() => {
        
        //Consultar la api
        const cargarProductos = () => {
            dispatch(obtenerProductosAction());
        }
        cargarProductos();

    }, [])


    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const productos = useSelector(state => state.productos.productos)

    return (
        <>
            <h2 className='text-center my-5'>Listado de Productos</h2>
            {error ? <p className='font-weight-bold alert alert-danger p1 mt-4 text-center'>Hubo un error</p> : null}

            <table className='table table-striped'>
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 && !cargando ? "No hay productos" : (
                        productos.map(producto=>(
                            <Producto key={producto.id} producto={producto} />
                        ))
                    )}
                    
                </tbody>
            </table>
            {cargando ? <p>Cargando...</p>: null}
        </>
    )
}

export default Productos
