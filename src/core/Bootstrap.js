import { LocalStorageProvider } from '../services/LocalStorageProvider.js';
import { SchedulerEngine } from '../engines/SchedulerEngine.js';
import { XPEngine } from '../engines/XPEngine.js';
import { App } from './App.js';
import { AppLogger } from '../utils/AppLogger.js';

export class Bootstrap {
    static async init() {
        AppLogger.info("Démarrage du Bootstrap du Learning OS...");
        
        const storage = new LocalStorageProvider();
        const scheduler = new SchedulerEngine(storage);
        const xpEngine = new XPEngine();
        
        const app = new App(storage, scheduler, xpEngine);
        await app.start();
        
        AppLogger.info("Bootstrap terminé. Application prête.");
        return app;
    }
}
