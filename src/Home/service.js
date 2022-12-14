import { fetchData, getTimeout } from '../database';
import { deleteAll, updateData } from './../database';

const _DB_KEY_ = 'USUARIO';

export function getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = fetchData(_DB_KEY_);
            resolve(items);
        }, getTimeout());
    });
}

export function setUsers(items) {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (const item of items) {
                updateData(_DB_KEY_, item.id, item);
            }
            resolve(items);
        }, getTimeout());
    });
}

export function logout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            deleteAll('LOGIN');
            resolve();
        }, getTimeout());
    });   
}