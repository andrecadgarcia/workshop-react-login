import { insertData, fetchData, deleteAll, getTimeout, encrypt } from "../database";

const DB_KEY = 'LOGIN';

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = fetchData('USUARIO', item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase() && item.senha === encrypt(senha));
            if (items.length === 0) {
                reject("Usuário e/ou senha inválidos");
            }
            else {
                insertData(DB_KEY, { usuario, logged_at: new Date(), token: encrypt(usuario) });
                resolve(`${usuario} entrou`);
            }
        }, getTimeout());
    });
}

export function logout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            deleteAll(DB_KEY);
            resolve();
        }, getTimeout());
    });   
}