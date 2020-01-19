import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /*Initial State - Estado Inicial del Componente */
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    /*React llama automaticamente se llama antes de que se muestre nada en la pantalla. */
    componentDidMount() {
        /* ID directamente de la url:  */
        Axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })
        })
        .catch(err => { console.log(err)})

        Axios.get('http://localhost:5000/users/')
        .then(res => {
            if (res.data.length > 0){
                this.setState({
                            users: res.data.map(user => user.username),
                })
            }
        })
        
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        /*Enviar información al backend: */
        Axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.error('Error: ' + err));

        // this.setState({
        //     username: ''
        // })

        window.location = '/';
    }

    render() {
        return (
            <div>
                <p>Editar el ejercicio</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label >Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option key={user} value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Descripción: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label >Duración (en minutos): </label>
                        <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration}>
                        </input>
                    </div>
                    <div className="form-">
                        <label >Fecha: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                    </div>
                    <br></br>

                    <div className="form-group">
                        <input type="submit" name="submit" value="Editar log de Ejercicio" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}