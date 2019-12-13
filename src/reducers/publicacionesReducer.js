import { ACTUALIZAR, CARGANDO, ERROR, COM_ACTUALIZAR, COM_CARGANDO, COM_ERROR } from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ACTUALIZAR:
            return {publicaciones: action.payload, cargando: false, error: '' }
        case CARGANDO:
            return {...state, cargando: true }
        case ERROR:
            return {...state, error: action.payload, cargando: false }
        case COM_ACTUALIZAR:
            return {publicaciones: action.payload, cargando: false, error: '' }
        case COM_CARGANDO:
            return {...state, cargando: true }
        case COM_ERROR:
                return {...state, error: action.payload, cargando: false }
        default: return state
    }
}