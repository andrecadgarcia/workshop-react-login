import { encrypt, fetchData, getTimeout, updateData } from '../database';

const _DB_KEY_ = 'USUARIO';

export function updatePassword(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = fetchData(_DB_KEY_, item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase());
            if (items.length === 0) {
                reject('Usuário não encontrado');    
            }
            else {
                updateData(_DB_KEY_, items[0].id, { usuario, senha: encrypt(senha) });
                resolve('Senha atualizada');
            }
        }, getTimeout());
    });
}