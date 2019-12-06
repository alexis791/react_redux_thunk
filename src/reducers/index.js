import { combineReducers } from 'redux'
import usuariosReducer from './usuarioReducer'
import publicacionesReducer from './publicacionesReducer'

export default combineReducers({
    usuariosReducer,
    publicacionesReducer
})