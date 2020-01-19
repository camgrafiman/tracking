import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios'

/* COMPONENTE EJERCICIO */

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Editar</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>Eliminar</a>
        </td>
    </tr>
)

/*COMPONENTE LISTA DE EJERCICIOS */
export default class ExercisesList extends Component {

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/exercises/')
        .then(res => {
            this.setState({
                exercises: res.data
            })
        })
        .catch(err => { console.error('Error: ' + err);})
    }
    deleteExercise(id) {
        Axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res.data));
        /*Filtrar los datos con filter para que devuelva solo el id que pasamos a la funcion deleteExercise */
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(ejercicioActual => {
            /*every Exercise es un row de la tabla */
            return <Exercise exercise={ejercicioActual} deleteExercise={this.deleteExercise} key={ejercicioActual._id}/>;
        })
    }

    render() {
        return (
            <div>
               <h3>Lista de Ejercicios</h3>
               <table className="table">
                   <thead className="thead-light">
                   <tr>
                       <th>Usuario</th>
                       <th>Descripción</th>
                       <th>Duración</th>
                       <th>Fecha</th>
                       <th>Acciones</th>
                   </tr>
                   </thead>
                   <tbody>
                       {this.exerciseList()}
                   </tbody>
               </table>
            </div>
        )
    }
}