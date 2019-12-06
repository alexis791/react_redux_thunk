import React from 'react'
import { connect } from 'react-redux'

/**Actions - Redux */
import usuariosTraerTodos from '../../actions/usuarioActions'
import { traerPorUsuario } from '../../actions/publicacionesActions'


class Publicaciones extends React.Component{

    async componentDidMount(){
        if(!this.props.usuariosReducer.usuarios.length){
            await this.props.usuariosTraerTodos()
        }

        this.props.traerPorUsuario()
    }

    render(){
        console.log(this.props)
        return(
            <div>
                {this.props.match.params.key}
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
    traerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)