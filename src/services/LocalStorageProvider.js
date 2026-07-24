import { StorageProvider } from './StorageProvider.js';
import { AppLogger } from '../utils/AppLogger.js';

export class LocalStorageProvider extends StorageProvider {
    async loadData(key) {
        AppLogger.info(`Storage: Loading data for key ${key}`);
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    
    async saveData(key, data) {
        AppLogger.info(`Storage: Saving data for key ${key}`);
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    async clearData(key) {
        AppLogger.info(`Storage: Clearing data for key ${key}`);
        localStorage.removeItem(key);
    }
}
