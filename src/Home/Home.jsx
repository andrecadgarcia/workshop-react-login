import './Home.css';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { fetchData } from '../database';
import { useNavigate } from 'react-router-dom';
import { logout } from './service';
import moment from 'moment/moment';
import { DataGrid } from '@mui/x-data-grid';

const UserTable = (props) => {
    const { usuarios } = props;

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number'  },
        { field: 'usuario', headerName: 'Usuário', type: 'string', width: 160  },
        { field: 'senha', headerName: 'Senha', type: 'string', width: 160  },
        { field: 'created_at', headerName: 'Criado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'updated_at', headerName: 'Atualizado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) }
    ];

    const localeDate = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    return (
        <DataGrid
            rows={usuarios || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    )
}

export default function Home(props) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const items = fetchData('LOGIN');
        if(items.length > 0) {
            setUser(items[0].usuario);
        }

        loadUsuarios();
    }, []);

    const loadUsuarios = () => {
        const items = fetchData('USUARIO');
        setUsuarios(items);
    }

    const logoutHandler = () => {
        setLoading(true);
        logout().then(() => {
            setLoading(false)
            navigate('/login');
        });
    }

    return (
        <div className="page-home">
            <div className="header">
                <div className="left">
                    <span></span>
                </div>
                <div className="right">
                    <p>Bem Vindo <strong>{user}</strong></p>
                    <Button
                        variant='contained'
                        onClick={logoutHandler}
                    >
                        <span>{loading ? 'Carregando...' : 'Sair'}</span>
                    </Button>
                </div>
            </div>
            <div style={{ width: '100%', flex: 1 }}>
                <UserTable usuarios={usuarios} />
            </div>
        </div>
    )
}