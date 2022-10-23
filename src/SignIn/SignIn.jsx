import { Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import { sigin } from './service';

export default function SigIn(props) {

    const { onSuccess, onCancel } = props;

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        sigin(usuario, senha)
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
                label="Senha"
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
                <span>{loading ? 'Carregando... ' : 'Cadastrar' }</span> 
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