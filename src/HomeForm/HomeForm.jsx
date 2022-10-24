import { Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import { updateEndereco, updateTelefone, updateEmail } from './../userStore/actions';
import { connect } from 'react-redux';

const mapStateToProps = store => {
    return {
        usuario: store.usuarios.usuarios.filter(item => item.selected)[0]
    }
}

function HomeForm(props) {

    const { onClose, entidade, dispatch, usuario } = props;

    const [valor, setValor] = useState('');

    const onSubmit = () => {
        switch(entidade) {
            case 'Endereço':
                dispatch(updateEndereco(usuario.id, valor));
                break;
            case 'Telefone':
                dispatch(updateTelefone(usuario.id, valor));
                break;
            case 'Email':
                dispatch(updateEmail(usuario.id, valor));
                break;
        } 
        onClose();
    }

    return (
        <Card className='container'>
            <TextField 
                variant='outlined'
                type='text'
                label="Usuário"
                disabled={true}
                value={usuario.usuario}
            />
            <TextField 
                variant='outlined'
                type='text'
                label={entidade}
                value={valor}
                onChange={event => setValor(event.target.value)}
            />

            <Button
                variant='contained'
                color='success'
                type='submit'
                onClick={onSubmit}
                disabled={!valor}
            > 
                <span>Atualizar</span> 
            </Button>

            <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={onClose}
            > 
                <span>Fechar</span> 
            </Button>
        </Card>
    )
}

export default connect(mapStateToProps)(HomeForm);