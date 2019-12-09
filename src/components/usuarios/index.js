import React, { Component } from 'react'
import { connect } from 'react-redux'

/**Redux */
import  usuariosTraerTodos  from '../../actions/usuarioActions'

/**Componentes */
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'
import Tabla from '../usuarios/Tabla'

/**CSS */
import '../../css/iconos.css'

class Usuarios extends Component {

   componentDidMount() {
     if(!this.props.usuarios.length){
       this.props.usuariosTraerTodos()
     }
    // this.props.usuariosTraerTodos()
  }

  ponerContenido = () => {

    if(this.props.cargando){
      return <Spinner/>
    }

    if(this.props.error){
      return <Fatal mensaje={this.props.error}/>
    }

    return <Tabla/>
  }

  render() {
    return(
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer
}

const mapDispatchToProps = {
  usuariosTraerTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios)