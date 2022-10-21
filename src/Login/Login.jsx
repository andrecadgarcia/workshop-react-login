import React, { useState, useEffect } from 'react';
import './Login.css';
import { login, sigin, update, getLoggedUser, logout } from './service';

export default class LoginClass extends React.Component {

    state = {}

    componentDidMount() {
        this.setState({
            usuario: '',
            senha: '',
            loading: false,
            resettingPassword: false,
            sigingIn: false
        });
    }

    setUsuario = (value) => {
        this.setState({ usuario: value });
    }

    setSenha = (value) => {
        this.setState({ senha: value });
    }

    loginHandler = () => {
        this.setState({ loading: true });
        login(this.state.usuario, this.state.senha).then(result => {
            alert(result);
        }).catch(result => {
            alert(result);
        }).finally(() => {
            this.restoreLoginForm();
        });
    }

    logoutHandler = () => {
        this.setState({ loading: true });
        logout().then(() => {
            
        }).catch(() => {
            
        }).finally(() => {
            this.restoreLoginForm();
        });
    }

    resetPasswordHandler = () => {
        if (!this.state.resettingPassword) {
            this.setState({ resettingPassword: true });
        }
        else {
            this.setState({ loading: true });
            update(this.state.usuario, this.state.senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                this.restoreLoginForm();
            });
        }
    }

    siginHandler = () => {
        if (!this.state.sigingIn) {
            this.setState({ sigingIn: true });
        }
        else {
            this.setState({ loading: true });
            sigin(this.state.usuario, this.state.senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                this.restoreLoginForm();
            });
        }
    }

    restoreLoginForm = () => {
        this.setState({ resettingPassword: false, sigingIn: false, senha: '', loading: false });
    }

    render() {

        const isFormValid = (this.state.usuario && this.state.senha && !this.loading) || false;

        return (
            <div className='page'>
                <div className='container'>
                    <label>CLASS FUNCTION</label>

                    {getLoggedUser() && (
                        <>
                            <p>Usuário: {getLoggedUser()}</p>
                            <button
                                onClick={this.logoutHandler}
                            >
                                <span>{this.state.loading ? 'Carregando...' : 'Sair'}</span>
                            </button>
                        </>
                    )}
                    {!getLoggedUser() && (
                        <>
                            <input
                                placeholder="Usuário"
                                value={this.state.usuario}
                                onChange={(event) => this.setUsuario(event.target.value)}>
                            </input>
                            <input
                                placeholder={this.state.resettingPassword ? "Nova Senha": "Senha"}
                                value={this.state.senha}
                                onChange={(event) => this.setSenha(event.target.value)}>
                            </input>

                            {!this.state.sigingIn && !this.state.resettingPassword && (
                                <button
                                    onClick={this.loginHandler}
                                    disabled={!isFormValid}
                                >
                                    <span>{this.state.loading ? 'Carregando...' : 'Entrar'}</span>
                                </button>
                            )}

                            {!this.state.sigingIn && (
                                <button
                                    onClick={this.resetPasswordHandler}
                                    disabled={this.state.resettingPassword && !isFormValid}
                                >
                                    {this.state.resettingPassword && <span>{this.state.loading ? 'Carregando...' : 'Atualizar Senha'}</span>}
                                    {!this.state.resettingPassword && <span>Esqueci minha senha</span>}
                                </button>
                            )}

                            {!this.state.resettingPassword && (
                                <button
                                    onClick={this.siginHandler}
                                    disabled={this.state.sigingIn && !isFormValid}
                                >
                                    {this.state.sigingIn && <span>{this.state.loading ? 'Carregando...' : 'Cadastrar'}</span>}
                                    {!this.state.sigingIn && <span>Não é cadastrado?</span>}
                                </button>
                            )}

                            {(this.state.sigingIn || this.state.resettingPassword) && (
                                <button
                                    onClick={this.restoreLoginForm}
                                    disabled={this.state.loading}
                                >
                                    <span>Voltar</span>
                                </button>
                            )}
                        </>
                    )}
                    
                </div>
            </div>
        );
    }
}

export function LoginFunction() {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [sigingIn, setSigningIn] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);

    useEffect(() => {

        return () => { }
    }, [])

    const loginHandler = () => {
        setLoading(true);
        login(usuario, senha).then(result => {
            alert(result);
        }).catch(result => {
            alert(result);
        }).finally(() => {
            restoreLoginForm();
        });
    }

    const logoutHandler = () => {
        setLoading(true);
        logout().then(() => {

        }).catch(() => {

        }).finally(() => {
            restoreLoginForm();
        });
    }

    const resetPasswordHandler = () => {
        if (!resettingPassword) {
            setResettingPassword(true);
        }
        else {
            setLoading(true);
            update(usuario, senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                restoreLoginForm();
            });
        }
    }

    const siginHandler = () => {
        if (!sigingIn) {
            setSigningIn(true);
        }
        else {
            setLoading(true);
            sigin(usuario, senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                restoreLoginForm();
            });
        }
    }

    const restoreLoginForm = () => {
        setResettingPassword(false);
        setSigningIn(false);
        setSenha('')
        setLoading(false);
    }

    const isFormValid = (usuario && senha && !loading) || false;

    return (
        <div className='page'>
            <div className='container'>
                <label>LOGIN FUNCTION</label>
                {getLoggedUser() && (
                    <>
                        <p>Usuário: {getLoggedUser()}</p>
                        <button
                            onClick={logoutHandler}
                        >
                            <span>{loading ? 'Carregando...' : 'Sair'}</span>
                        </button>
                    </>
                )}
                {!getLoggedUser() && (
                    <>
                        <input
                            placeholder="Usuário"
                            value={usuario}
                            onChange={(event) => setUsuario(event.target.value)}>
                        </input>
                        <input
                            placeholder={resettingPassword ? "Nova Senha": "Senha"}
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}>
                        </input>

                        {!sigingIn && !resettingPassword && (
                            <button
                                onClick={loginHandler}
                                disabled={!isFormValid}
                            >
                                <span>{loading ? 'Carregando...' : 'Entrar'}</span>
                            </button>
                        )}

                        {!sigingIn && (
                            <button
                                onClick={resetPasswordHandler}
                                disabled={resettingPassword && !isFormValid}
                            >
                                {resettingPassword && <span>{loading ? 'Carregando...' : 'Atualizar Senha'}</span>}
                                {!resettingPassword && <span>Esqueci minha senha</span>}
                            </button>
                        )}

                        {!resettingPassword && (
                            <button
                                onClick={siginHandler}
                                disabled={sigingIn && !isFormValid}
                            >
                                {sigingIn && <span>{loading ? 'Carregando...' : 'Cadastrar'}</span>}
                                {!sigingIn && <span>Não é cadastrado?</span>}
                            </button>
                        )}

                        {(sigingIn || resettingPassword) && (
                            <button
                                onClick={restoreLoginForm}
                                disabled={loading}
                            >
                                <span>Voltar</span>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}