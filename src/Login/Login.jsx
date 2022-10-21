import React, { useState, useEffect } from 'react';
import './Login.css';

export default class LoginClass extends React.Component {

    state = {}

    componentDidMount() {
        this.setState({
            usuario: 'TESTE',
            senha: '',
            loggingIn: false
        });
    }

    setUsuario = (value) => {
        this.setState({ usuario: value });
    }

    setSenha = (value) => {
        this.setState({ senha: value });
    }

    clickHandler = () => {
        this.setState({ loggingIn: true });
        setTimeout(() => {
            this.setState({ loggingIn: false });
        }, 2000);
    }

    render() {
        return (
            <div className='page'>
                <div className='container'>
                    <label>CLASS FUNCTION</label>

                    <input placeholder="Usuário" value={this.state.usuario} onChange={(event) => this.setUsuario(event.target.value)}></input>
                    <input placeholder="Senha" value={this.state.senha} onChange={(event) => this.setSenha(event.target.value)}></input>
                    
                    <button onClick={this.clickHandler}> Entrar </button>

                    {this.state.loggingIn && <p>LOGIN {'->'} {this.state.usuario} - {this.state.senha}</p>}
                </div>
            </div>
        );
    }
}

export function LoginFunction() {
    
    const [usuario, setUsuario] = useState('TESTE');
    const [senha, setSenha] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const list = [ 1, 2, 3, 4, 5];

    useEffect(() => {
        
        return () => { }
    }, [ ])

    const clickHandler = () => {
        setLoggingIn(true);
        setTimeout(() => {
            setLoggingIn(false);
        }, 2000);
    }

    return (
        <div className='page'>
            <div className='container'>
                <label>LOGIN FUNCTION</label>
                
                <input placeholder="Usuário" value={usuario} onChange={(event) => setUsuario(event.target.value)}></input>
                <input placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)}></input>
                
                <button onClick={clickHandler}> Entrar </button>

                {loggingIn && <p>LOGIN {'->'} {usuario} - {senha}</p> || <p>NOT LOGGED IN</p>}

                {list.map(item => <li>{item}</li>)}
            </div>
        </div>
    )
}