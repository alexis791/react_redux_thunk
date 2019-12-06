import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes'
import axios from 'axios'

export const traer_todos = function () {
    return async (dispatch) => {

        dispatch({
            type: CARGANDO
        })

        try {
            const respuesta = await axios.get('http://jsonplaceholder.typicode.com/posts');
            dispatch({
                type: TRAER_TODOS,
                payload: respuesta.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Algo salió mal, intente mas tarde.'
            })
        }
    }
}

export const traerPorUsuario = () => async(dispatch) => {
    const respuesta = await axios('http://jsonplaceholder.typicode.com/posts?userId=1')
    dispatch({
        type: TRAER_TODOS,
        payload: respuesta.data
    })
}
