import { StorageProvider } from './StorageProvider.js';

export class MemoryProvider extends StorageProvider {
    constructor() {
        super();
        this.store = new Map();
    }
    
    async loadData(key) {
        return this.store.has(key) ? JSON.parse(this.store.get(key)) : null;
    }
    
    async saveData(key, data) {
        this.store.set(key, JSON.stringify(data));
    }
    
    async clearData(key) {
        this.store.delete(key);
    }
}
