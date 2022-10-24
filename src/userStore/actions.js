import { getUsers, setUsers } from './../Home/service';

export const fetchUsers = () => (dispatch) => {
    dispatch(userRequested());
    return getUsers().then(items => dispatch(userReceived(items))); 
}

export const saveUsers = () => (dispatch, getState) => {
    dispatch(saveRequested());
    return setUsers(getState().usuarios.usuarios).then(items => dispatch(saveReceived(items))); 
}

export const userRequested = () => {
    return {
        type: 'USER_REQUESTED'
    }
}

export const userReceived = (items) => {
    return {
        type: 'USER_RECEIVED',
        usuarios: items
    }
}

export const saveRequested = () => {
    return {
        type: 'SAVE_REQUESTED'
    }
}

export const saveReceived = (items) => {
    return {
        type: 'SAVE_RECEIVED',
        usuarios: items
    }
}

export const updateSelected = (ids) => {
    return {
        type: 'USER_SELECTED',
        ids
    }
}

export const updateEndereco = (id, endereco) => {
    return {
        type: 'ENDERECO_UPDATE',
        id,
        endereco
    }
}

export const updateTelefone = (id, telefone) => {
    return {
        type: 'TELEFONE_UPDATE',
        id,
        telefone
    }
}

export const updateEmail = (id, email) => {
    return {
        type: 'EMAIL_UPDATE',
        id,
        email
    }
}