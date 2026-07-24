import { LocalStorageProvider } from '../services/LocalStorageProvider.js';
import { SchedulerEngine } from '../engines/SchedulerEngine.js';
import { XPEngine } from '../engines/XPEngine.js';
import { StudyRecordEngine } from '../engines/StudyRecordEngine.js';
import { App } from './App.js';
import { AppLogger } from '../utils/AppLogger.js';

export class Bootstrap {
    static async init() {
        AppLogger.info("Démarrage du Bootstrap du Learning OS...");
        
        let storage, scheduler, xpEngine, studyRecordEngine;
        
        try {
            storage = new LocalStorageProvider();
        } catch (e) { AppLogger.error("Erreur Storage: " + e.message); }
        
        try {
            scheduler = new SchedulerEngine(storage);
        } catch (e) { AppLogger.error("Erreur Scheduler: " + e.message); }
        
        try {
            xpEngine = new XPEngine();
        } catch (e) { AppLogger.error("Erreur XP: " + e.message); }
        
        try {
            studyRecordEngine = new StudyRecordEngine(storage, xpEngine);
        } catch (e) { AppLogger.error("Erreur StudyRecord: " + e.message); }
        
        if (!storage || !scheduler || !xpEngine || !studyRecordEngine) {
            throw new Error("Impossible d'initialiser les moteurs critiques.");
        }
        
        const app = new App(storage, scheduler, xpEngine, studyRecordEngine);
        await app.start();
        
        AppLogger.info("Bootstrap terminé. Application prête.");
        return app;
    }
}
