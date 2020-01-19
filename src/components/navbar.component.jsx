import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*Todos los componentes empiezan con export default.. */
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Ejercicio tracking</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Ejercicios</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Crear un log de Ejercicio</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Crear usuario</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };
}