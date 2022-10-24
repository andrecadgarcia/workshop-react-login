import React from 'react';
import SigIn from '../SignIn/SignIn';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import './Login.css';
import { login } from './service';
import { TextField, Button, Dialog, DialogTitle, Card } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { fetchData } from '../database';

export default class LoginClass extends React.Component {

    state = {
        usuario: '',
        senha: '',
        loggedIn: false,

        dialog: {
            open: false,
            title: '',
            content: null
        },

        loading: false
    }

    componentDidMount() {
        const items = fetchData('LOGIN');
        if (items.length > 0) {
            this.setState({ loggedIn: true });
        }
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
            this.setState({ loggedIn: true });
        }).catch(result => {
            alert(result);
        }).finally(() => {
            this.restoreLoginForm();
        });
    }

    resetPasswordHandler = () => {
        this.setState({
            dialog: {
                open: true,
                title: 'Atualizar Senha',
                content: (
                    <UpdatePassword 
                        onSuccess={(result) => this.handleDialogClose(result)}
                        onCancel={this.handleDialogClose}
                    />
                )
            }
        });
    }

    siginHandler = () => {
        this.setState({
            dialog: {
                open: true,
                title: 'Cadastrar Usuário',
                content: (
                    <SigIn 
                        onSuccess={(result) => this.handleDialogClose(result)}
                        onCancel={this.handleDialogClose}
                    />
                )
            }
        });
    }

    restoreLoginForm = () => {
        this.setState({ resettingPassword: false, sigingIn: false, senha: '', loading: false });
    }

    handleDialogClose = (result = null) => {
        this.setState({ dialog: { open: false, title: '', content: null }});
        if (result) {
            alert(result);
        }
    }

    render() {

        const isFormValid = (this.state.usuario && this.state.senha && !this.loading) || false;

        return (
            <div className='page'>
                <Card className='container'>
                    <TextField
                        variant='outlined'
                        label="Usuário"
                        value={this.state.usuario}
                        onChange={(event) => this.setUsuario(event.target.value)}>
                    </TextField>
                    <TextField
                        variant='outlined'
                        type="password"
                        label="Senha"
                        value={this.state.senha}
                        onChange={(event) => this.setSenha(event.target.value)}>
                    </TextField>

                    <Button
                        variant='contained'
                        color='success'
                        type='submit'
                        onClick={this.loginHandler}
                        disabled={!isFormValid}
                    >
                        <span>{this.state.loading ? 'Carregando...' : 'Entrar'}</span>
                    </Button>

                    <Button
                        variant='contained'
                        color='info'
                        type='button'
                        onClick={this.resetPasswordHandler}
                    >
                        <span>Atualizar Senha</span>
                    </Button>

                    <Button
                        variant='contained'
                        color='info'
                        onClick={this.siginHandler}
                    >
                        <span>Cadastrar</span>
                    </Button>
                    
                </Card>
                <Dialog onClose={this.handleDialogClose} open={this.state.dialog.open}>
                    <DialogTitle>{this.state.dialog.title}</DialogTitle>
                    {this.state.dialog.content}
                </Dialog>
                {this.state.loggedIn && <Navigate to="/home" replace={true} />}
            </div>
        );
    }
}
