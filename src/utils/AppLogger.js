import { config } from '../config/config.js';

export class AppLogger {
    static info(message, ...args) {
        if (config.debugMode) {
            console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
        }
    }
    
    static warn(message, ...args) {
        if (config.debugMode) {
            console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
        }
    }
    
    static error(message, ...args) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
    }
}
