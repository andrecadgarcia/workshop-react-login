const initialState = {
    loading: false,
    usuarios: []
}
const userReducer = (state = initialState, action) => {
    const usuarios = [ ...state.usuarios ];
    let index;
    switch(action.type) {
        case 'SAVE_REQUESTED':
        case 'USER_REQUESTED':
            return {
                ...state,
                loading: true
            };
        case 'SAVE_RECEIVED':
        case 'USER_RECEIVED':
            return {
                ...state,
                loading: false,
                usuarios: action.usuarios
            }
        case 'USER_SELECTED':
            for (const item of usuarios) {
                item.selected = (action.ids === undefined || action.ids.indexOf(item.id) > -1);
            }
            return {
                ...state,
                usuarios
            }
        case 'ENDERECO_UPDATE':
            index = usuarios.findIndex(item => item.id === action.id);
            if (index > -1) {
                usuarios[index].endereco = action.endereco;
            }
            return {
                ...state,
                usuarios
            }
        case 'TELEFONE_UPDATE':
            index = usuarios.findIndex(item => item.id === action.id);
            if (index > -1) {
                usuarios[index].telefone = action.telefone;
            }
            return {
                ...state,
                usuarios
            }
        case 'EMAIL_UPDATE':
            index = usuarios.findIndex(item => item.id === action.id);
            if (index > -1) {
                usuarios[index].email = action.email;
            }
            return {
                ...state,
                usuarios
            }
        default:
            return state;
    }
}

export default userReducer;