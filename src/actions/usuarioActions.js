import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

const traer_todos = () => {

    return async (dispatch) => {

        dispatch({
            type: CARGANDO
        })

        try {
            const respuesta =  await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch({
                type:TRAER_TODOS,
                payload: respuesta.data
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:'Algo Salió mal, intente mas tarde.'
            })
        }
    }
}

export default traer_todos