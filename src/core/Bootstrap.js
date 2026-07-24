import { LocalStorageProvider } from '../services/LocalStorageProvider.js';
import { SchedulerEngine } from '../engines/SchedulerEngine.js';
import { XPEngine } from '../engines/XPEngine.js';
import { App } from './App.js';
import { AppLogger } from '../utils/AppLogger.js';

export class Bootstrap {
    static async init() {
        AppLogger.info("Démarrage du Bootstrap du Learning OS...");
        
        let storage, scheduler, xpEngine;
        
        try {
            storage = new LocalStorageProvider();
            AppLogger.info("Storage Engine initialisé.");
        } catch (e) {
            AppLogger.error("Erreur Storage: " + e.message);
        }
        
        try {
            scheduler = new SchedulerEngine(storage);
            AppLogger.info("Scheduler Engine initialisé.");
        } catch (e) {
            AppLogger.error("Erreur Scheduler: " + e.message);
        }
        
        try {
            xpEngine = new XPEngine();
            AppLogger.info("XP Engine initialisé.");
        } catch (e) {
            AppLogger.error("Erreur XP: " + e.message);
        }
        
        if (!storage || !scheduler || !xpEngine) {
            throw new Error("Impossible d'initialiser les moteurs critiques.");
        }
        
        const app = new App(storage, scheduler, xpEngine);
        await app.start();
        
        AppLogger.info("Bootstrap terminé. Application prête.");
        return app;
    }
}
