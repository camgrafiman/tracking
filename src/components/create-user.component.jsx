import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /*Initial State - Estado Inicial del Componente */
        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        console.log(user);

        /*Enviar información al backend: */
        Axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.error('Error: ' + err));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Crear nuevo Usuario</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Usuario: </label>
                    <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>

                </div>
                <div className="form-group">
                    <input type="submit" value="Crear Usuario" className="btn btn-secondary" />
                </div>

                </form>
            </div>
        )
    }
}