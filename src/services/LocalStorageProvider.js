import { StorageProvider } from './StorageProvider.js';

export class LocalStorageProvider extends StorageProvider {
    async loadData(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    
    async saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    async clearData(key) {
        localStorage.removeItem(key);
    }
}
