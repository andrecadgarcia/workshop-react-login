import './Home.css';
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle } from '@mui/material';
import { fetchData } from '../database';
import { useNavigate } from 'react-router-dom';
import { logout } from './service';
import moment from 'moment/moment';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { fetchUsers, updateSelected, saveUsers } from './../userStore/actions';
import HomeForm from '../HomeForm/HomeForm';

export const mapStateToProps = store => ({
    usuarios: store.usuarios.usuarios,
    selected: store.usuarios.usuarios.filter(item => item.selected)
});

const UserTable = connect(mapStateToProps)((props) => {
    const { usuarios, dispatch } = props;

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number'  },
        { field: 'usuario', headerName: 'Usuário', type: 'string', width: 160  },
        { field: 'senha', headerName: 'Senha', type: 'string', width: 160  },
        { field: 'created_at', headerName: 'Criado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'updated_at', headerName: 'Atualizado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'endereco', headerName: 'Endereço', type: 'string', width: 160  },
        { field: 'telefone', headerName: 'Telefone', type: 'string', width: 160  },
        { field: 'email', headerName: 'Email', type: 'string', width: 160  }
    ];

    const localeDate = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    const onSelect = (ids) => {
        dispatch(updateSelected(ids));
    }

    return (
        <DataGrid
            rows={usuarios || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={onSelect}
        />
    )
});

export function Home(props) {

    const { usuarios, selected, dispatch } = props; 
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [dialog, setDialog] = useState({ open: false, title: '', content: null });

    useEffect(() => {
        const items = fetchData('LOGIN');
        if(items.length > 0) {
            setLoggedUser(items[0].usuario);
        }

        dispatch(fetchUsers())
    }, []);

    const logoutHandler = () => {
        setLoading(true);
        logout().then(() => {
            setLoading(false)
            navigate('/login');
        });
    }

    const handleEndereco = () => {
        setDialog({
            open: true,
            title: 'Atualizar Endereço',
            content: <HomeForm entidade="Endereço" onClose={handleDialogClose} />
        });
    }

    const handleTelefone = () => {
        setDialog({
            open: true,
            title: 'Atualizar Telefone',
            content: <HomeForm entidade="Telefone" onClose={handleDialogClose}/>
        });
    }

    const handleEmail = () => {
        setDialog({
            open: true,
            title: 'Atualizar Email',
            content: <HomeForm entidade="Email" onClose={handleDialogClose} />
        });
    }
    
    const handleDialogClose = () => {
        setDialog({
            open: false,
            title: '',
            content: null
        });
    }

    const handleSave = () => {
        dispatch(saveUsers());
    }

    return (
        <div className="page-home">
            <div className="header">
                <div className="left">
                    <Button
                        variant='contained'
                        color='info'
                        onClick={handleEndereco}
                        disabled={selected.length !== 1}
                    >
                        <span>Atualizar Endereço</span>
                    </Button>
                    <Button
                        variant='contained'
                        color='warning'
                        onClick={handleTelefone}
                        disabled={selected.length !== 1}
                    >
                        <span>Atualizar Telefone</span>
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleEmail}
                        disabled={selected.length !== 1}
                    >
                        <span>Atualizar Email</span>
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={handleSave}
                    >
                        <span>Salvar</span>
                    </Button>
                </div>
                <div className="right">
                    <p>Bem Vindo <strong>{loggedUser}</strong></p>
                    <Button
                        variant='contained'
                        onClick={logoutHandler}
                    >
                        <span>{loading ? 'Carregando...' : 'Sair'}</span>
                    </Button>
                </div>
            </div>
            <div style={{ width: '100%', flex: 1 }}>
                <UserTable />
            </div>
            <Dialog onClose={handleDialogClose} open={dialog.open}>
                <DialogTitle>{dialog.title}</DialogTitle>
                {dialog.content}
            </Dialog>
        </div>
    )
}

export default connect(mapStateToProps)(Home);