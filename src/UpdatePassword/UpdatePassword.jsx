import { Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import { updatePassword } from './service';

export default function UpdatePassword(props) {

    const { onSuccess, onCancel } = props;

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        updatePassword(usuario, senha)
            .then(result => onSuccess(result) )
            .catch(err => alert(err) )
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Card className='container'>
            <TextField 
                variant='outlined'
                type='text'
                label="Usuário"
                value={usuario}
                onChange={event => setUsuario(event.target.value)}
            />
            <TextField 
                variant='outlined'
                type='text'
                label="Nova Senha"
                value={senha}
                onChange={event => setSenha(event.target.value)}
            />

            <Button
                variant='contained'
                color='success'
                type='submit'
                onClick={onSubmit}
                disabled={!usuario || !senha || loading}
            > 
                <span>{ loading ? 'Carregando...' : 'Atualizar Senha' }</span> 
            </Button>

            <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={onCancel}
            > 
                <span>Cancelar</span> 
            </Button>
        </Card>
    )
}