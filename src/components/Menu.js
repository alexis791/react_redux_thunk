import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => (
    <div id="menu">
        <Link to="/">Usuarios</Link>
        <Link to="/tareas">Tareas</Link>
    </div>
)

export default Menu