function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
    const items = localStorage.getItem(key);
    if (items) {
        return JSON.parse(items);
    } 
    return [];
}

export function getTimeout() {
    return 1000;
}

export function encrypt(value) {
    return btoa(value);
}

export function decrypt(value) {
    return atob(value);
}

export function insertData(key, item) {
    const items = getLocalStorage(key);
    const maxID = Math.max(items.map(item => item.id)) || 0;

    items.push({ ...item, id: (maxID + 1), created_at: new Date(), updated_at: new Date() });
    setLocalStorage(key, items)
}

export function updateData(key, id, item) {
    const items = getLocalStorage(key);
    const index = items.findIndex(_item => _item.id === id);
    if (index > -1) {
        items[index] = { ...items[index], ...item, updated_at: new Date() };
    }
    setLocalStorage(key, items);
}

export function deleteData(key, id) {
    const items = getLocalStorage(key);
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
        items.splice(index, 1);
    }
    setLocalStorage(key, items);
}

export function deleteAll(key) {
    setLocalStorage(key, []);
}

export function fetchData(key, filterFn = null) {
    const items = getLocalStorage(key);
    if (filterFn) {
        return items.filter(filterFn);
    }
    return items;
}