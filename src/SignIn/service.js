import { fetchData, insertData, getTimeout, encrypt } from './../database';

const _DB_KEY_ = 'USUARIO';

export function sigin(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = fetchData(_DB_KEY_, item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase());
            if (items.length > 0) {
                reject('Usuário já cadastrado');    
            }
            else {
                insertData(_DB_KEY_, { usuario, senha: encrypt(senha) });
                resolve('Usuário cadastrado');
            }
        }, getTimeout());
    });
}