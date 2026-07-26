export class StorageContract {
    async saveData(key, data) {
        throw new Error("Method 'saveData()' must be implemented.");
    }

    async loadData(key) {
        throw new Error("Method 'loadData()' must be implemented.");
    }
}
