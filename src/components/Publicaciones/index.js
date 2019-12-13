import React from 'react'
import { connect } from 'react-redux'

/**Actions - Redux */
import usuariosTraerTodos from '../../actions/usuarioActions'
import { traerPorUsuario, abrirCerrar, traerComentarios } from '../../actions/publicacionesActions'

/**Components */
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'
import Comentarios from './Comentarios'


class Publicaciones extends React.Component{

    async componentDidMount(){
        const {
            match: { params: { key } }
        } = this.props

        if(!this.props.usuariosReducer.usuarios.length){
            await this.props.usuariosTraerTodos()
        }

        if(this.props.usuariosReducer.error){
            return
        }

        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            this.props.traerPorUsuario(key)
        }
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props

        if(!usuariosReducer.usuarios.length || usuariosReducer.error){
            return <Fatal mensaje={usuariosReducer.error}/>
        }

        if(usuariosReducer.cargando){
            return <Spinner/>
        }

        const nombre = usuariosReducer.usuarios[key].name

        return(
            <h1>Publicaciones de { nombre } </h1>
        )
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: {usuarios},
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props

        if(!usuarios.length) return
        if(usuariosReducer.error) return

        if(publicacionesReducer.cargando){
            return <Spinner />
        }

        if(publicacionesReducer.error){
            return <Fatal mensaje={publicacionesReducer.error}/>
        }

        if(!publicaciones.length) return
        if(!('publicaciones_key' in usuarios[key])) return

        const {publicaciones_key} = usuarios[key]

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        )
    }

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map( (publicacion, com_key) => (
            <div 
                className='pub_titulo'
                key={publicacion.id}    
                onClick= { () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
            >
                <h2>
                    { publicacion.title }
                </h2>
                <h3>
                    { publicacion.body }
                </h3>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : ''
                }
            </div>
        ) )
    )

    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key)
        if (!comentarios.length) {
            this.props.traerComentarios(pub_key, com_key)
        }
    }

    render(){
        return(
            <div>
                
                {this.props.match.params.key}
                { this.ponerUsuario()}
                { this.ponerPublicaciones()}
            </div>
        )
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    traerPorUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)